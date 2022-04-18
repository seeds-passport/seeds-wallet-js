const { SeedsMnemonic } = require("../../libs/seeds-mnemonic/src/main");

const generateNewKeysWithMnemonic = () => {
  const seedsMnemonicInstance = new SeedsMnemonic();

  return seedsMnemonicInstance.generateRandomKeys();
};

module.exports = { generateNewKeysWithMnemonic };
