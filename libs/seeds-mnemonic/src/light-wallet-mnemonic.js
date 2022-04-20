const ecc = require("eosjs-ecc");

/**
 * LightWalletMnemonic - Class for generating keys based on LightWallet compatible mnemonics
 * @class LightWalletMnemonic
 */
class LightWalletMnemonic {
  /**
   * generateKeysFromMnemonic - generates private and public keys based on passed string with mnemonic
   * @param  {any} unsafeMnemonic
   * @return
   * @memberof PassportMnemonic
   */
  generateKeysFromMnemonic(unsafeMnemonic) {
    const mnemonic = ((unsafeMnemonic || "").match(/\b\w+\b/g) || [])
      .join("-")
      .toLowerCase();

    const convertedEOSPrivateKey = ecc.seedPrivate(mnemonic);
    const convertedEOSPublicKey = ecc.privateToPublic(convertedEOSPrivateKey);

    const eosKey = {
      privateKey: convertedEOSPrivateKey,
      publicKey: convertedEOSPublicKey,
    };

    return eosKey;
  }
}

module.exports = LightWalletMnemonic;
