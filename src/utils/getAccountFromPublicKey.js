import fetch from "node-fetch";
import { JsonRpc } from "eosjs";
const DEFAULT_RPC_ENDPOINT = "https://test.hypha.earth/";

export const getAccountFromPublicKey = async ({
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
