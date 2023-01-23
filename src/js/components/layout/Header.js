import { user } from "../../user/user.js";
import { userAPI } from "../../user/userAPI.js";
import { $c } from "../../utils/createElement.js";
import { $ } from "../../utils/query.js";
import Modal from "../ui/Modal.js";

export default function Header($app, initialState) {
  this.state = initialState;
  this.$target = $c("header");

  $app.append(this.$target);
  user.subscribe(this);

  this.setState = (newState) => {
    this.state = { ...this.state, ...newState };
    this.render();
  };
  const contentMap = {
    "SIGN UP": [
      {
        text: "id",
        type: "input",
        klass: "id",
      },
      {
        text: "password",
        type: "input",
        klass: "pw",
      },
      {
        text: "password",
        type: "input",
        klass: "url",
      },
    ],
    "SIGN IN": [
      {
        text: "id",
        type: "input",
        klass: "signInId",
      },
      {
        text: "password",
        type: "input",
        klass: "signInPw",
      },
    ],
  };
  const handlerMap = {
    "SIGN IN": signInHandle,
    "SIGN UP": signUpHandle,
  };

  function signInHandle() {
    const $id = $(".modal__body.signInId");
    const $pw = $(".modal__body.signInPw");
    userAPI.signIn($id.value, $pw.value);
  }
  function signUpHandle() {
    const $id = $(".modal__body.id");
    const $pw = $(".modal__body.pw");
    const $url = $(".modal__body.url");
    userAPI.signUp($id.value, $pw.value, $url.value);
  }

  this.$target.addEventListener("click", (e) => {
    if (e.target.textContent === "LOG OUT") {
      userAPI.logOut();
    }
    if (
      e.target.textContent === "SIGN UP" ||
      e.target.textContent === "SIGN IN"
    ) {
      new Modal(
        $app,
        {
          hide: false,
          body: {
            title: e.target.textContent,
            contentBody: contentMap[e.target.textContent],
          },
          btns: [
            {
              type: "",
              text: "SUBMIT",
            },
          ],
        },
        handlerMap[e.target.textContent]
      );
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
