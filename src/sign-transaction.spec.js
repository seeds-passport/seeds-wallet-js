jest.setTimeout(15000);
const SeedsWallet = require("./main");
const { configureLocalStorage } = require("./utils");
const SeedsAuthenticatorUtil = require("seeds-authenticator-util");
const { generateAuthenticateAction } = require("./actions");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

const testAccount = "aleksandar11";
const testPrivateKey = "5J5jGdyU87PK4rjGBJ9nuVHeugLk4AUFDjcX28fL7QJmrdCmfwH";
const testPassword = "testsifra22";

it("Signs the transaction", async () => {
  const storage = configureLocalStorage();
  const authenticator = new SeedsAuthenticatorUtil();
  const walletInstance = new SeedsWallet({ storage, authenticator });

  await walletInstance.setupWallet({
    privateKey: testPrivateKey,
    password: testPassword,
  });

  const { id, policy, signature } = await authenticator.newSession({
    accountName: testAccount,
  });

  const actions = generateAuthenticateAction({
    id,
    signature,
    policy,
    actor: testAccount,
    permission: "active",
  });

  const signedTransaction = await walletInstance.signTransaction({
    accountName: testAccount,
    password: testPassword,
    actions,
  });

  expect(signedTransaction).toBeTruthy();
});
