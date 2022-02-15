const SeedsWallet = require("./index");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

const testAccount = "aleksandar11";
const testKey = "1111111111111111111";
const testPassword = "testsifra22";

const wallet =
  "2877d691b4772010b5c9ddea9f7e57de618bd0e9a371b965cd5dc86097c1b6f3lpHFsmWzu6u28nnrCHfsAA==9d4e898ab84e39759440943044a0ea33ea5e67350a21740f28dc721d5210dcfb";
const passwordHash =
  "e44aab367113eec6be61b8c8f8221c35486c95bb48157abace051855fa1cbfe6";

it("Generates the wallet", async () => {
  const walletInstance = new SeedsWallet(localStorage);

  const encryptedWallet = await walletInstance.setupWallet(
    testAccount,
    testKey,
    testPassword
  );

  console.log("ENCRYPTED WALLET: ", encryptedWallet);

  return encryptedWallet;
});

it("Decrypts the wallet", async () => {
  const walletInstance = new SeedsWallet(localStorage);
  await walletInstance.setupWallet(testAccount, testKey, testPassword);

  await walletInstance.decrypt(testPassword);
});
