const bip39 = require("bip39");
const Wallet = require("ethereumjs-wallet");
const buffer = require("buffer");
const eth = require("ethereumjs-util");
const ecc = require("eosjs-ecc");

const { hdkey } = Wallet;

/**
 * PassportMnemonic - Class for generating keys based on Passport compatible mnemonics
 * @class PassportMnemonic
 */
class PassportMnemonic {
  /**
   * generateRandomKeys - generates random mnemonic and private and public EOS keys based on that mnemonic
   * @return
   * @memberof PassportMnemonic
   */
  generateRandomKeys() {
    const mnemonic = bip39.generateMnemonic();
    const eosKey = this.generateKeysFromMnemonic(mnemonic);
    eosKey.mnemonic = mnemonic;
    eosKey.mnemonicGeneratedBy = "passport";
    return eosKey;
  }

  /**
   * generateKeysFromMnemonic - generates private and public keys based on passed string with mnemonic
   * @param  {any} unsafeMnemonic
   * @return
   * @memberof PassportMnemonic
   */
  generateKeysFromMnemonic(unsafeMnemonic) {
    const mnemonic = ((unsafeMnemonic || "").match(/\b\w+\b/g) || [])
      .join(" ")
      .toLowerCase();
    const ethKey = this.generateEthPrivateKeyFromMnemonic(mnemonic);
    const eosKey = this.createEosKeyFromEthKey(ethKey);
    eosKey.mnemonic = mnemonic;
    eosKey.mnemonicGeneratedBy = "passport";
    return eosKey;
  }

  generateEthPrivateKeyFromMnemonic(mnemonic) {
    const hdWallet = hdkey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonic));
    const walletHdpath = "m/44'/60'/0'/0/1";
    const wallet = hdWallet.derivePath(walletHdpath).getWallet();
    const privateKey = wallet.getPrivateKey().toString("hex");
    return privateKey;
  }

  createEosKeyFromEthKey(ethereumPrivateKey) {
    const Buffer = buffer.Buffer;

    if (eth.isValidPrivate(Buffer.from(ethereumPrivateKey, "hex"))) {
      const eosWIF = ecc
        .PrivateKey(Buffer.from(ethereumPrivateKey, "hex"))
        .toWif();
      const convertedEOSPrivateKey = eosWIF;
      const convertedEOSPublicKey = ecc.privateToPublic(eosWIF);
      return {
        privateKey: convertedEOSPrivateKey,
        publicKey: convertedEOSPublicKey,
      };
    } else {
      throw new Error("invalid-eth-private-key");
    }
  }
}

module.exports = PassportMnemonic;
