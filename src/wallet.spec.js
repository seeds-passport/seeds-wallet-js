import SeedsWallet from "./main";
import { configureLocalStorage } from "./utils/configureLocalStorage.js";

console.log("CONFIGURE LOCAL STORAGE: ", configureLocalStorage);

const testAccount = "aleksandar11";
const testKey = "5J5jGdyU87PK4rjGBJ9nuVHeugLk4AUFDjcX28fL7QJmrdCmfwH";
const testPassword = "testsifra22";

const wallet =
  "2877d691b4772010b5c9ddea9f7e57de618bd0e9a371b965cd5dc86097c1b6f3lpHFsmWzu6u28nnrCHfsAA==9d4e898ab84e39759440943044a0ea33ea5e67350a21740f28dc721d5210dcfb";
const passwordHash =
  "e44aab367113eec6be61b8c8f8221c35486c95bb48157abace051855fa1cbfe6";

it("Generates the wallet", async () => {
  const storage = configureLocalStorage();
  const walletInstance = new SeedsWallet({ storage });

  const encryptedWallet = await walletInstance.setupWallet({
    password: testPassword,
    privateKey: testKey,
  });
  console.log("ENCRYPTED WALLET: ", encryptedWallet);

  expect(encryptedWallet).toBeTruthy();
});

// it("List wallets", async () => {
//   const storage = configureLocalStorage();
//   const walletInstance = new SeedsWallet({ storage });
//   await walletInstance.setupWallet({
//     privateKey: testKey,
//     password: testPassword,
//   });

//   const wallets = await walletInstance.listWallets({
//     password: testPassword,
//   });

//   expect(wallets).toBeTruthy();
// });
