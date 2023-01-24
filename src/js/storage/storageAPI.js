import storage from "./storage.js";
import { agoraStatesDiscussions } from "../data/data.js";

export const storageAPI = {
  setInitialStorage() {
    const storageList = storage.getStorageList();
    const dObj = {};

    storageList.forEach((a) => {
      !storage.getData(a) && storage.setData(a, {});
    });

    agoraStatesDiscussions.forEach((e) => {
      dObj[e.id] = e;
    });

    !Object.keys(storage.getData("discussion")).length &&
      storage.setData("discussion", dObj);
  },
};
