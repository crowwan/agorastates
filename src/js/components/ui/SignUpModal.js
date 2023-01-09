import { user } from "../../user/user.js";
import { userAPI } from "../../user/userAPI.js";
import { $c } from "../../utils/createElement.js";
import { $ } from "../../utils/query.js";
export default function SignUpModal($app, initialState) {
  this.$target = $c("section");
  this.$target.classList.add("modal");

  this.state = initialState;

  this.setState = (newState) => {
    this.state = { ...initialState, ...newState };
    this.render();
  };

  this.$target.addEventListener("click", (e) => {
    const $id = $(".modal__input.id");
    const $pw = $(".modal__input.pw");

    if (e.target.className === "modal") {
      this.setState({ hide: true });
    }
    if (e.target.textContent === "SUBMIT") {
      if (userAPI.signUp($id.value, $pw.value)) {
        this.setState({ hide: true });
      }
    }
  });

  this.render = () => {
    if (this.state.hide) {
      $app.removeChild(this.$target);
    } else {
      this.$target.style.display = "flex";
    }
    const html = `
    <div class="modal__container">
      <header class="modal__title">SIGN UP</header>
      <div class="modal__contentBody">
        <div class="modal__topText modal__text">id</div>
        <input class="modal__input id" />
      </div>
      <div class="modal__contentBody">
        <div class="modal__topText modal__text">password</div>
        <input class="modal__input pw" />
      </div>
      
      <div class="modal__btnList">
        <button class="modal__btnList--btn btn">SUBMIT</button>
      </div>
    </div>`;

    this.$target.innerHTML = html;
  };
  $app.append(this.$target);
  this.render();
}
