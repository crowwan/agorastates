import { parseJson, toJson } from "../utils/jsonUtils.js";
export default (function () {
  const storageList = ["user", "discussion"];

  return {
    getStorageList() {
      return [...storageList];
    },
    getData(key) {
      return localStorage.getItem(key)
        ? parseJson(localStorage.getItem(key))
        : null;
    },
    setData(key, data) {
      localStorage.setItem(key, toJson(data));
    },
  };
})();
