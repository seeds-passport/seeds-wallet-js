const SimpleCrypto = require("simple-crypto-js").default;
const sha256 = require("sha256");

/**
 * SeedsWallet implements generating, encryption and decryption of wallet keys and mnemonic
 * @class SeedsWallet
 */
class SeedsWallet {
  constructor(storage, walletPrefix = `seeds-wallet`) {
    const walletStorageKey = `${walletPrefix}-key`;
    const passhashStorageKey = `${walletPrefix}-passhash`;
    this.storage = storage;
    this.walletStorageKey = walletStorageKey;
    this.passhashStorageKey = passhashStorageKey;
    this.wallet = storage.getItem(walletStorageKey);
    this.passhash = storage.getItem(passhashStorageKey);
    this.setupWallet = this.setupWallet.bind(this);
  }

  /**
   * setupWallet - generates encrypted wallet with user provided password and stores it
   * @param  {string} privateKey
   * @param  {string} password
   * @param  {string} accountName
   * @param  {string} mnemonic
   * @return {object}
   * @memberof SeedsWallet
   */
  async setupWallet(password, privateKey, accountName, mnemonic) {
    const passwordHash = sha256(password);
    const simpleCrypto = new SimpleCrypto(password);
    const wallet = await simpleCrypto.encrypt({
      privateKey,
      accountName,
      mnemonic,
    });

    this.wallet = wallet;
    this.passwordHash = passwordHash;

    await this.storage.setItem(walletKey, this.wallet);
    await this.storage.setItem(passwordHashKey, passwordHash);

    return {
      wallet,
      passwordHash,
    };
  }

  /**
   *
   * @param  {string} passcode
   * @return
   * @memberof SeedsWallet
   */
  decrypt(passcode) {
    if (!this.wallet) throw new Error("wallet-not-setup");

    if (sha256(passcode) !== this.passwordHash)
      throw new Error("wrong-passcode");

    const simpleCrypto = new SimpleCrypto(passcode);

    const response = simpleCrypto.decrypt(this.wallet);

    return response;
  }
}

module.exports = SeedsWallet;
