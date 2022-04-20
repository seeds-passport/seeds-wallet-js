const defaultCallApiFn = require("./utils/api");
const { DEFAULT_URL, ENDPOINTS } = require("./config/index");

class SeedsAuthenticatorUtil {
  constructor({ apiUrl = DEFAULT_URL, callApi = defaultCallApiFn } = {}) {
    this.apiUrl = apiUrl;
    this.callApi = callApi.bind(this);
    this.newSession = this.newSession.bind(this);
    this.checkSession = this.checkSession.bind(this);
    this.getAccountInfo = this.getAccountInfo.bind(this);
    this.invalidateSession = this.invalidateSession.bind(this);
  }

  /**
   * newSession - gets id, policy and signature for creating a new session
   * @param  {any} { accountName }
   * @return
   * @memberof SeedsAuthenticator
   */
  async newSession({ accountName }) {
    const checkEndpoint = `${this.apiUrl}/${ENDPOINTS.NEW}`;
    const session = await this.callApi(checkEndpoint, {
      account_name: accountName,
    });

    return session.message;
  }

  /**
   * checkSession
   * @param  {any} { token, backendUserId }
   * @return
   * @memberof SeedsAuthenticator
   */
  async checkSession({ token, backendUserId }) {
    const checkEndpoint = `${this.apiUrl}/${ENDPOINTS.CHECK}/${backendUserId}`;
    const sesssion = await this.callApi(checkEndpoint, {
      token,
    });

    return sesssion.message;
  }

  /**
   * getAccountInfo
   * @param  {any} { token, backendUserId }
   * @return
   * @memberof SeedsAuthenticator
   */
  async getAccountInfo({ token, backendUserId }) {
    const endpoint = `${this.apiUrl}/${ENDPOINTS.CHECK}/${backendUserId}`;
    const sesssion = await this.callApi(endpoint, {
      token,
    });

    return sesssion;
  }

  // TODO: To be implemented
  async invalidateSession({ accountName, token, backendUserId }) {}
}

module.exports = SeedsAuthenticatorUtil;
