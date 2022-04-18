const { SeedsWallet } = require("./main");
const { configureLocalStorage } = require("./utils");

const testPassword = "testsifra22";

it("Provides with signed ESR to connect new keys to existing account ", async () => {
  const storage = configureLocalStorage();
  const walletInstance = new SeedsWallet({ storage });

  const esr = await walletInstance.getConnectAccountESR({
    password: testPassword,
  });

  expect(esr).toBeTruthy();
});
