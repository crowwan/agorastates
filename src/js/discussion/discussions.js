import storage from "../storage/storage.js";
import { filter, go, map } from "../utils/functional.js";
import { log } from "../utils/log.js";

export const discussion = (() => {
  let discussions = storage.getData("discussion");
  let observers = [];
  return {
    setUp() {
      discussions = this.getDiscussions();
    },
    getSubscribers() {
      return observers;
    },
    subscribe(component) {
      observers.push(component);
    },
    unSubscribe(component) {
      observers = filter((a) => a !== component, observers);
    },
    notifyAll() {
      go(
        observers,
        map((a) => a.setState({ discussions }))
      );
    },
    getDiscussions() {
      return storage.getData("discussion");
    },
    setDiscussion(id, data) {
      console.log(discussions);
      discussions[id] = data;
      storage.setData("discussion", discussions);

      this.notifyAll();
    },
    removeDiscussion(id) {
      console.log(discussions);
      delete discussions[id];
      storage.setData("discussion", discussions);
      this.notifyAll();
    },
  };
})();
