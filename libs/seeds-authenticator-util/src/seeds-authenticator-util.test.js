const fetch = require("node-fetch");
const SeedsAuthenticator = require("./main");
const callApi = require("./utils/api");

it("Gets the details for creating new session", async () => {
  const authenticator = new SeedsAuthenticator({ callApi: callApi(fetch) });
  const accountName = "aleksandar11";
  const newSession = await authenticator.newSession({ accountName });
  expect(newSession).toBeTruthy();
});

// it("Returns the account details for provided token", async () => {
//   const authenticator = new SeedsAuthenticator({ callApi: callApi(fetch) });
//   const accountName = "aleksandar11";
//   const { id, token } = await authenticator.newSession({ accountName });

//   console.log("ID AND TOKEN: ", id, token);
//   const info = await authenticator.getAccountInfo({ token, backendUserId: id });
//   expect(info).toBeTruthy();
// });
