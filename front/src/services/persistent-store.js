export default {
  set(key, value) {
    window.localStorage.setItem(key, value);
    return this.get(key);
  },

  get(key) {
    return window.localStorage.getItem(key) || null;
  },

  setObj(key, value) {
    return window.localStorage.setItem(key, JSON.stringify(value));
  },

  getObj(key) {
    return JSON.parse(window.localStorage.getItem(key) || null);
  },

  remove(key) {
    window.localStorage.removeItem(key);
  }
};
