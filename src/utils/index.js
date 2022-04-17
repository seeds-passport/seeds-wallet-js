import ecc from "eosjs-ecc";
import { configureLocalStorage } from "./configureLocalStorage";
import { generateNewKeysWithMnemonic } from "./generateNewKeysWithMnemonic";
import { getAccountFromPublicKey } from "./getAccountFromPublicKey";

const isValidPrivateKey = (privateKey) => ecc.isValidPrivate(privateKey);

export {
  isValidPrivateKey,
  getAccountFromPublicKey,
  configureLocalStorage,
  generateNewKeysWithMnemonic,
};
