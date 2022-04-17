import { SeedsMnemonic } from "../../libs/seeds-mnemonic/src/main";

const generateNewKeysWithMnemonic = () => {
  const seedsMnemonicInstance = new SeedsMnemonic();

  return seedsMnemonicInstance.generateRandomKeys();
};

export { generateNewKeysWithMnemonic };
