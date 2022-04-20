const { SigningRequest } = require("eosio-signing-request");
const { Api, JsonRpc } = require("eosjs");
const pako = require("pako");
const util = require("util");

const { DEFAULT_RPC_ENDPOINT } = require("./config/index.js");

const textEncoder = new util.TextEncoder();
const textDecoder = new util.TextDecoder();

const getOpts = async (api) => {
  return {
    textEncoder,
    textDecoder,
    zlib: {
      deflateRaw: (data) => new Uint8Array(pako.deflateRaw(Buffer.from(data))),
      inflateRaw: (data) => new Uint8Array(pako.inflateRaw(Buffer.from(data))),
    },
    abiProvider: {
      getAbi: async (account) => {
        return await api.getAbi(account);
      },
    },
  };
};

class ESRUtil {
  constructor(rpcEndpoint, fetch) {
    console.log("FETCH : ", fetch);
    const rpc = new JsonRpc(rpcEndpoint || DEFAULT_RPC_ENDPOINT, { fetch });
    const api = new Api({
      rpc,
      textDecoder,
      textEncoder,
    });

    this.rpc = rpc;
    this.api = api;
    this.getOpts = getOpts.bind(this);
    this.encodeESR = this.encodeESR.bind(this);
    this.decodeESR = this.decodeESR.bind(this);
  }

  decodeESR = async (esr) => {
    const { api } = this;
    const opts = await this.getOpts(api);
    try {
      const signingRequest = await SigningRequest.from(esr, opts);
      return signingRequest;
    } catch (e) {
      console.log("ERROR");
      console.log(e);
    }
  };

  encodeESR = async (actions, callback, info) => {
    const { rpc, api } = this;
    const opts = await this.getOpts(api);
    const rpcInfo = await rpc.get_info();
    const chainId = rpcInfo.chain_id;
    const request = await SigningRequest.create(
      { actions, chainId, callback, info },
      opts
    );
    const esr = request.encode();
    return esr;
  };
}

module.exports = ESRUtil;
