const SeedsWallet = require("./main");
const { configureLocalStorage } = require("./utils");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

const testPassword = "testsifra22";

it("Provides with signed ESR to connect new keys to existing account ", async () => {
  const storage = configureLocalStorage();
  const walletInstance = new SeedsWallet({ storage });

  const esr = await walletInstance.getConnectAccountESR({
    password: testPassword,
  });

  expect(esr).toBeTruthy();
});
