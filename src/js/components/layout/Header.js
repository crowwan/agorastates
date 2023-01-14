import { user } from "../../user/user.js";
import { userAPI } from "../../user/userAPI.js";
import { $c } from "../../utils/createElement.js";
import SignInModal from "../ui/SignInModal.js";
import SignUpModal from "../ui/SignUpModal.js";

export default function Header($app, initialState) {
  this.state = initialState;
  this.$target = $c("header");

  $app.append(this.$target);
  user.subscribe(this);

  this.setState = (newState) => {
    this.state = { ...this.state, ...newState };
    this.render();
  };

  this.$target.addEventListener("click", (e) => {
    if (e.target.textContent === "LOG OUT") {
      userAPI.logOut(e.current$target);
    }
    if (e.target.textContent === "SIGN UP") {
      new SignUpModal($app, {
        hide: false,
      });
    }
    if (e.target.textContent === "SIGN IN") {
      new SignInModal($app, {});
    }
  });

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
    this.$target.innerHTML = html;
  };

  this.render();
}
