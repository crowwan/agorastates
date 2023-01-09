import { user } from "./user/user.js";
import { storageAPI } from "./storage/storageAPI.js";
import Header from "./components/layout/Header.js";
import { log } from "./utils/log.js";
export default function App($app) {
  this.setUp = () => {
    storageAPI.setStorage();
    user.setCurrentUser("");
  };
  this.setUp();

  console.log(user.getCurrentUser());
  this.state = {};
  this.setState = (newState) => {
    this.state = { ...this.state, ...newState };
  };

  const header = new Header($app, { userId: user.getCurrentUser() });
}
