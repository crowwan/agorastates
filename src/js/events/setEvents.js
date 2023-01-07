import { $, $A } from "../utils/query.js";
import view from "../view/view.js";
import { userAPI } from "../user/userAPI.js";
// import { signUpModalTmpl } from "../view/signUpModalTmpl.js";
const log = console.log;

export const setEvents = () => {
  const signUpBtn = $(".btnList__signIn");
  const modal = $A(".modal");
  const signInBtn = $(".sigIn__btn");

  console.log(modal);
  signUpBtn.addEventListener("click", (e) => {
    view.showModal("signUp");
  });

  modal.forEach((m) =>
    m.addEventListener("click", (e) => {
      // signUpModalTmpl();
    })
  );
};
