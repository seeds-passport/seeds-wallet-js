const DEFAULT_URL =
  process.env.SEEDS_AUTHENTICATOR_API || "http://auth-staging.joinseeds.earth";
const ENDPOINTS = {
  NEW: "new",
  CHECK: "check",
  INFO: "info",
  INVALIDATE: "invalidate",
};

module.exports = {
  DEFAULT_URL,
  ENDPOINTS,
};
