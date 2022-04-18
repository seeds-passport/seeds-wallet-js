const ecc = require("eosjs-ecc");
const { configureLocalStorage } = require("./configureLocalStorage");
const {
  generateNewKeysWithMnemonic,
} = require("./generateNewKeysWithMnemonic");
const { getAccountFromPublicKey } = require("./getAccountFromPublicKey");

const isValidPrivateKey = (privateKey) => ecc.isValidPrivate(privateKey);

module.exports = {
  isValidPrivateKey,
  getAccountFromPublicKey,
  configureLocalStorage,
  generateNewKeysWithMnemonic,
};
