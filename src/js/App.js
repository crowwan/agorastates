import { user } from "./user/user.js";
import { storageAPI } from "./storage/storageAPI.js";
import { setView } from "./view/view.js";
import { setEvents } from "./events/setEvents.js";
export default {
  setUp() {
    storageAPI.setStorage();
    user.setCurrentUser("");
    setView("");
    setEvents();
  },
};
