const SEEDSPassportMnemonic = require("./passport-mnemonic");
const spmInstance = new SEEDSPassportMnemonic();

const mnemonic =
  "upon what runway husband grief bomb evoke bicycle episode century crystal jazz";
const expectedPrivateKey =
  "5HpYGg6hfeD2a16PUoAf22AMzPFUuqDpBCMSbYGRmeDppJ8dyM9";
const expectedPublicKey =
  "EOS5DmdNG4mv2tFrJY1yqctExqa34G2anXfaQ5sXeAwZTSnRFVH6Y";

test("Generates appropriate private key based on mnemonic", () => {
  const eosKeys = spmInstance.generateKeysFromMnemonic(mnemonic);
  expect(eosKeys.privateKey).toBe(expectedPrivateKey);
});

test("Generates appropriate public key based on mnemonic", () => {
  const eosKeys = spmInstance.generateKeysFromMnemonic(mnemonic);
  expect(eosKeys.publicKey).toBe(expectedPublicKey);
});
