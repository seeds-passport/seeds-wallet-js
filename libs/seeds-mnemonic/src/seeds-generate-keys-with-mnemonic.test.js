const { SeedsMnemonic } = require("./main");

const mnemonicLW =
  "box coach sail improve crush chief sight license craft powder give mandate";
const expectedPrivateKeyLW =
  "5Jx2Mf9DRV8LYsPkTe85ME4fkXhw1wEFyCzEr8RytGX3Cxg1Zns";
const expectedPublicKeyLW =
  "EOS7b2tFvDayVHWPfqEguWxdDBsqwBUxgmUZr4cPxoqxFBjKjk5P2";

const mnemonicPassport =
  "upon what runway husband grief bomb evoke bicycle episode century crystal jazz";
const expectedPrivateKeyPassport =
  "5HpYGg6hfeD2a16PUoAf22AMzPFUuqDpBCMSbYGRmeDppJ8dyM9";
const expectedPublicKeyPassport =
  "EOS5DmdNG4mv2tFrJY1yqctExqa34G2anXfaQ5sXeAwZTSnRFVH6Y";

test("Generates appropriate keys based on Passport mnemonic", () => {
  const seedsInstance = new SeedsMnemonic((val) => {
    return val === expectedPublicKeyPassport;
  });

  const eosKeys = seedsInstance.generateKeysFromMnemonic(mnemonicPassport);
  expect(eosKeys.publicKey).toBe(expectedPublicKeyPassport);
});

test("Generates appropriate keys based on LW mnemonic", () => {
  const seedsInstance = new SeedsMnemonic((val) => {
    return val === expectedPublicKeyLW;
  });

  const eosKeys = seedsInstance.generateKeysFromMnemonic(mnemonicLW);

  expect(eosKeys.publicKey).toBe(expectedPublicKeyLW);
});
