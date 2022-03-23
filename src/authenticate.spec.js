jest.setTimeout(15000);
const SeedsWallet = require("./main");
const SeedsAuthenticatorUtil = require("seeds-authenticator-util");
const { configureLocalStorage } = require("./utils");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

const testAccount = "aleksandar11";
const testPassword = "testsifra22";
const testPrivateKey = "5J5jGdyU87PK4rjGBJ9nuVHeugLk4AUFDjcX28fL7QJmrdCmfwH";

it("Retrieves the info from Authenticator", async () => {
  const storage = configureLocalStorage();
  const authenticator = new SeedsAuthenticatorUtil();
  const walletInstance = new SeedsWallet({ storage, authenticator });

  const wallet = await walletInstance.setupWallet({
    privateKey: testPrivateKey,
    password: testPassword,
  });

  const { token } = await walletInstance.authenticate({
    accountName: testAccount,
    password: testPassword,
  });

  console.log("token:", token);

  expect(token).toBeTruthy();
});
