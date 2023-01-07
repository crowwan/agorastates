import { map } from "../utils/functional.js";
import storage from "./storage.js";
export const storageAPI = {
  getData(key) {
    if (localStorage.getItem(key)) return localStorage.getItem(key);
  },
  setData(key, data) {
    localStorage.setItem(key, data);
  },
  setStorage() {
    const storageList = storage.getStorageList();
    console.log("test");
    map(
      (a) => (!storageAPI.getData(a) ? storageAPI.setData(a, "{}") : ""),
      storageList
    );
  },
};
