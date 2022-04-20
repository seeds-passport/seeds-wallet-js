const LightWalletMnemonic = require("./light-wallet-mnemonic");
const lwInstance = new LightWalletMnemonic();

const accountName = "alekslw11111";
const mnemonic =
  "box coach sail improve crush chief sight license craft powder give mandate";

const expectedPrivateKey =
  "5Jx2Mf9DRV8LYsPkTe85ME4fkXhw1wEFyCzEr8RytGX3Cxg1Zns";

const expectedPublicKey =
  "EOS7b2tFvDayVHWPfqEguWxdDBsqwBUxgmUZr4cPxoqxFBjKjk5P2";

test("Generates appropriate private key based on mnemonic", () => {
  const eosKeys = lwInstance.generateKeysFromMnemonic(mnemonic);
  expect(eosKeys.privateKey).toBe(expectedPrivateKey);
});

test("Generates appropriate public key based on mnemonic", () => {
  const eosKeys = lwInstance.generateKeysFromMnemonic(mnemonic);
  expect(eosKeys.publicKey).toBe(expectedPublicKey);
});
