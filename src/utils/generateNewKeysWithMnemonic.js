const SeedsMnemonic = require("seeds-mnemonic");

const generateNewKeysWithMnemonic = () => {
  const seedsMnemonicInstance = new SeedsMnemonic();
  return seedsMnemonicInstance.generateRandomKeys();
};

module.exports = generateNewKeysWithMnemonic;
