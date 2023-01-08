import { user } from "../../user/user.js";
import { userAPI } from "../../user/userAPI.js";
import { $c } from "../../utils/createElement.js";
import { log } from "../../utils/log.js";
import { SignInModal } from "../modal/SignInModal.js";
import { SignUpModal } from "../modal/SignUpModal.js";

export default function Header($app, initialState) {
  this.state = initialState;
  this.target = $c("header");
  $app.append(this.target);

  user.subscribe(this);
  log(user.getSubscribers());
  console.log(this.state);

  this.target.addEventListener("click", (e) => {
    if (e.target.textContent === "LOG OUT") {
      log(e.currentTarget);
      userAPI.logOut(e.currentTarget);
    }
    if (e.target.textContent === "SIGN UP") {
      const signUpModal = new SignUpModal($app, {
        userId: user.getCurrentUser(),
      });
    }
    if (e.target.textContent === "SIGN IN") {
      const signInModal = new SignInModal($app, {});
    }
  });

  this.setState = (newState) => {
    this.state = { ...this.state, ...newState };
    console.log(this.state);
    this.render();
  };

  this.render = () => {
    const html = `
        <header class="header">
          <h1 class="header__title">
            <a href="/"> AGORASTATES</a>
          </h1>
          <section class="btnList">
          ${
            !this.state.userId
              ? `<button class="btnList__signIn">SIGN IN</button>
          <button class="btnList__signIn">SIGN UP</button>`
              : `<button class="btnList__signIn">LOG OUT</button>`
          }
          </section>
        </header>
      `;
    this.target.innerHTML = html;
  };

  this.render();
}
