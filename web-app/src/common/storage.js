class WebStorage {
  constructor(storage) {
    this.storage = storage;
  }
  get(key) {
    return this.storage.getItem(key);
  }
  set(key, value) {
    return this.storage.setItem(key, value);
  }
  remove(key) {
    return this.storage.removeItem(key);
  }
  removeAll() {
    return this.storage.clear();
  }
}
class MemeryStorage {
  constructor() {
    this.storage = {};
  }
  get(key) {
    return this.storage[key];
  }
  set(key, value) {
    return (this.storage[key] = value);
  }
  remove(key) {
    delete this.storage[key];
  }
  removeAll() {
    this.storage = {};
  }
}
export const storage = {
  local: new WebStorage(window.localStorage),
  session: new WebStorage(window.sessionStorage),
  memery: new MemeryStorage()
};
