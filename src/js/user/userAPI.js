import { storageAPI } from "../storage/storageAPI.js";
import { parseJson, toJson } from "../utils/jsonUtils.js";
import SHA256 from "../utils/hash.js";
import { user } from "./user.js";
export const userAPI = {
  signUp(userId, userPw) {
    const userData = parseJson(storageAPI.getData("user"));

    if (userData[userId]) {
      alert("아이디가 존재합니다.");
      return;
    }

    userData[userId] = SHA256(userPw);
    storageAPI.setData("user", toJson(userData));
    user.setCurrentUser(userId);
    user.notifyAll();
    return;
  },
  signIn(userId, userPw) {
    const userData = parseJson(storageAPI.getData("user"));

    if (userData[userId] && userData[userId] === SHA256(userPw))
      user.setCurrentUser(userId);
    else if (!userData[userId]) alert("아이디가 존재하지 않습니다.");
    else if (!passwordMatch(userData[userId], SHA256(userPw)))
      alert("비밀번호가 틀렸습니다.");

    return;
  },
  logOut(tag) {
    user.setCurrentUser("");
    user.notifyAll();
  },
};

function passwordMatch(pw1, pw2) {
  return pw1 === pw2;
}
