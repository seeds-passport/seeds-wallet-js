const fetch = require("node-fetch");
const { JsonRpc } = require("eosjs");
const DEFAULT_RPC_ENDPOINT = "https://test.hypha.earth/";

const getAccountFromPublicKey = async ({
  publicKey,
  accountName,
  rpcEndpoint = DEFAULT_RPC_ENDPOINT,
}) => {
  const rpc = new JsonRpc(rpcEndpoint, { fetch });
  const data = await rpc.history_get_key_accounts(publicKey);
  const { account_names } = data;
  if (accountName && account_names.includes(accountName)) return accountName;
  return account_names && account_names[0];
};

module.exports = getAccountFromPublicKey;
