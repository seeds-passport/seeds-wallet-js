const PassportMnemonicClass = require("./passport-mnemonic");
const LightWalletMnemonicClass = require("./light-wallet-mnemonic");

const DEFAULT_MNEMONIC_HANDLERS = [
  new PassportMnemonicClass(),
  new LightWalletMnemonicClass(),
];

/**
 * SeedsMnemonic - Class for generating keys based on Passport and LightWallet compatible mnemonics
 * @class SeedsMnemonic
 */
class SeedsMnemonic {
  /**
   * Creates an instance of SeedsMnemonic.
   * @param  {function name(params) {
     any
   }} checkAccountFn
   * @param  {InstanceType} [defaultMnemonicHandler=new PassportMnemonicClass()] 
   * @param  {Array} [mnemonicHandlers=DEFAULT_MNEMONIC_HANDLERS] 
   * @memberof SeedsMnemonic
   */
  constructor(
    checkAccountFn,
    defaultMnemonicHandler = new PassportMnemonicClass(),
    mnemonicHandlers = DEFAULT_MNEMONIC_HANDLERS
  ) {
    this.checkAccount = checkAccountFn;
    this.defaultMnemonicHandler = defaultMnemonicHandler;
    this.mnemonicHandlers = mnemonicHandlers;
  }
  /**
   * generateRandomKeys - generates random mnemonic and private and public EOS keys based on that mnemonic
   * @return
   * @memberof SeedsMnemonic
   */
  generateRandomKeys() {
    return this.defaultMnemonicHandler.generateRandomKeys();
  }

  /**
   * generateKeysFromMnemonic - generates private and public keys based on passed string with mnemonic
   * @param  {any} unsafeMnemonic
   * @return
   * @memberof PassportMnemonic
   */
  generateKeysFromMnemonic(unsafeMnemonic) {
    let foundKeys;
    for (let i = 0; i < this.mnemonicHandlers.length; i++) {
      const handler = this.mnemonicHandlers[i];
      const keys = handler.generateKeysFromMnemonic(unsafeMnemonic);
      const foundAccount = this.checkAccount(keys.publicKey);
      if (foundAccount) return (foundKeys = keys);
    }

    if (foundKeys) return foundKeys;

    throw new Error("account-not-found");
  }
}

module.exports = { SeedsMnemonic };
