if (typeof localStorage === "undefined" || localStorage === null) {
  class LocalStorageMock {
    constructor() {
      this.store = {};
    }

    clear() {
      this.store = {};
    }

    getItem(key) {
      return this.store[key] || null;
    }

    setItem(key, value) {
      this.store[key] = String(value);
    }

    removeItem(key) {
      delete this.store[key];
    }
  }

  global.localStorage = new LocalStorageMock();
}

/**
 * configureLocalStorage
 * @param  {any} [{
 *   storage = localStorage,
 *   rootKey = "seedsWallet",
 * }={}]
 * @return
 */
const configureLocalStorage = ({
  storage = localStorage,
  rootKey = "seedsWallet",
} = {}) => {
  return {
    list: async () => {
      const wallet = await storage.getItem(rootKey);
      if (!wallet) return;

      return Object.entries(JSON.parse(wallet));
    },
    set: async (key, value) => {
      const savedWallet = await storage.getItem(rootKey);
      const wallet = savedWallet ? JSON.parse(savedWallet) : {};

      wallet[key] = value;

      await storage.setItem(rootKey, JSON.stringify(wallet));
    },
    remove: async (key) => {
      const savedWallet = await storage.getItem(rootKey);
      const wallet = JSON.parse(savedWallet);

      delete wallet[key];

      await storage.setItem(rootKey, JSON.stringify(wallet));
    },
    get: async (key) => {
      const savedWallet = await storage.getItem(rootKey);
      if (!savedWallet) return;
      const wallet = JSON.parse(savedWallet);
      return wallet[key];
    },
  };
};

export { configureLocalStorage };
