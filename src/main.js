const SimpleCrypto = require("simple-crypto-js").default;
const { Api } = require("eosjs");
const JsSignatureProvider = require("eosjs/dist/eosjs-jssig");
const ecc = require("eosjs-ecc");
const fetch = require("node-fetch");

const {
  isValidPrivateKey,
  getAccountFromPublicKey,
  generateNewKeysWithMnemonic,
} = require("./utils");
const ESRUtil = require("../libs/seeds-esr-util/src/main");

const {
  generateAuthenticateAction,
  generateUpdateAuthAction,
} = require("./actions");

/**
 * SeedsWallet implements generating, encryption and decryption of wallet keys and mnemonic
 * @class SeedsWallet
 */
class SeedsWallet {
  constructor({ storage, authenticator }) {
    this.storage = storage;
    this.esrUtil = new ESRUtil(undefined, fetch);
    this.authenticator = authenticator;
  }

  /**
   * listWallets
   * @return
   * @memberof SeedsWallet
   */
  async listWallets() {
    const wallets = await this.storage.list();
    if (!wallets) return;

    return wallets.map(({ key, account, publicKey }) => ({
      key,
      account,
      publicKey,
    }));
  }

  /**
   * setupWallet - generates encrypted wallet with user provided password and stores it
   * @param  {string} privateKey
   * @param  {string} password
   * @param  {string} mnemonic
   * @return {object}
   * @memberof SeedsWallet
   */
  async setupWallet({ password, privateKey, mnemonic }) {
    console.time("setup-wallet");
    if (!isValidPrivateKey(privateKey))
      throw new Error("private-key-not-valid");

    console.log("SYMPLE CRYPTO: ", SimpleCrypto);
    const passwordHash = await ecc.sha256(password);
    const simpleCrypto = new SimpleCrypto(password);

    const publicKey = await ecc.privateToPublic(privateKey);
    const accountName = await getAccountFromPublicKey({
      publicKey,
    });

    const account = { accountName };

    const encryptedKeys = await simpleCrypto.encrypt({
      privateKey,
      mnemonic,
    });

    const wallet = { passwordHash, publicKey, account, encryptedKeys };

    await this.storage.set(accountName, wallet);
    console.timeEnd("setup-wallet");

    return { publicKey, account };
  }

  /**
   * removeWallet - remove wallet
   * @param  {any} { password, publicKey }
   * @return {void}@memberof SeedsWallet
   */
  async removeWallet({ password, key }) {
    const providedPasswordHash = await ecc.sha256(password);
    const walletToRemove = await this.storage.get(key);

    if (!walletToRemove) throw new Error("wallet-not-found");

    const { passwordHash, account } = walletToRemove;

    if (passwordHash !== providedPasswordHash)
      throw new Error("wrong-password");

    await this.storage.remove(key);

    return { key, account };
  }

  /**
   * getConnectAccountESR - Method that generates new key pair and generates ESR for `updateauth` action
   * @param  {string} { password }
   * @return
   * @memberof SeedsWallet
   */
  async getConnectAccountESR({ password }) {
    // 1. generate keys and mnemonic
    const { privateKey, publicKey, mnemonic } = generateNewKeysWithMnemonic();

    // 2. setup wallet
    await this.setupWallet({ password, privateKey, mnemonic });

    // 3. generate action
    const actions = generateUpdateAuthAction({ publicKey });
    console.log("ACTIONS: ", actions);

    const esr = await this.esrUtil.encodeESR(actions);
    return esr;
  }

  async authenticate({ accountName, password }) {
    console.log("Retrieve session data from SEEDS Authenticator...");
    const { id, policy, signature, token } =
      await this.authenticator.newSession({
        accountName,
      });

    console.log("Generate signed request");
    const actions = generateAuthenticateAction({
      id,
      signature,
      policy,
      actor: accountName,
    });

    console.log("Sign signed request for authenticating account");
    await this.signTransaction({
      actions,
      accountName,
      password,
    });

    return { id, policy, signature, token };
  }

  async signTransaction({
    esr,
    action,
    actions,
    accountName,
    permission,
    password,
  }) {
    if (!esr && !action && !actions)
      throw new Error("ESR, action or actions param is required!");

    const preparedActions = actions || [action];

    // const signedRequest =
    //   esr || (await this.esrUtil.encodeESR(preparedActions));

    // const decoded = await this.esrUtil.decodeESR(signedRequest);

    // const head = (await this.esrUtil.rpc.get_info(true)).head_block_num;
    // const block = await this.esrUtil.rpc.get_block(head);
    // Fetch the ABIs needed for decoding
    // const abis = await decoded.fetchAbis();

    // console.log("ABIS: ", abis);

    // console.log("ABIS: ", abis);
    // An authorization to resolve the transaction to
    // const authorization = {
    //   actor: accountName,
    //   permission,
    // };

    // console.log("AUTHORIZATION: ", authorization);

    // Resolve the transaction as a specific user
    // const resolved = await decoded.resolve(abis, authorization, block);

    // console.log("RESOLVED: ", resolved.transaction);

    const { rpc, textDecoder, textEncoder } = this.esrUtil;

    const signatureProvider = await this.getSignatureProvider({
      accountName,
      password,
    });

    const api = new Api({
      rpc,
      signatureProvider,
      textDecoder,
      textEncoder,
    });

    const result = await api.transact(
      {
        actions: preparedActions,
      },
      {
        blocksBehind: 3,
        expireSeconds: 30,
      }
    );

    return result;
  }

  /**
   * decrypt - Method that decrypts wallet ??? TODO: Check if needed in this form
   * @param  {string} password
   * @return
   * @memberof SeedsWallet
   */
  async getSignatureProvider({ accountName, password }) {
    if (!this.storage) throw new Error("no-storage");

    const wallet = await this.storage.get(accountName);

    if (ecc.sha256(password) !== wallet.passwordHash)
      throw new Error("wrong-passcode");

    const { encryptedKeys } = wallet;
    const simpleCrypto = new SimpleCrypto(password);
    const { privateKey } = await simpleCrypto.decrypt(encryptedKeys);

    const signatureProvider = new JsSignatureProvider([privateKey]);

    return signatureProvider;
  }
}

module.exports = { SeedsWallet };
