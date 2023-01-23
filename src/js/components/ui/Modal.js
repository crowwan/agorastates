import { userAPI } from "../../user/userAPI.js";
import { $c } from "../../utils/createElement.js";
import { map } from "../../utils/functional.js";
import { $ } from "../../utils/query.js";
import ModalContent from "../ModalContent.js";
import { discussion } from "../../discussion/discussions.js";
import ButtonList from "../ButtonList.js";

export default function Modal($app, initialState, handler) {
  this.$target = $c("section");
  this.$target.classList.add("modal");

  this.state = initialState;

  this.setState = (newState) => {
    this.state = { ...this.state, ...newState };
    this.render();
  };

  this.$target.addEventListener("click", (e) => {
    if (e.target.className === "modal") {
      this.setState({ hide: true });
    }
    if (e.target.textContent === "SUBMIT") {
      handler();
      this.setState({ hide: true });
    }
    if (e.target.tagName === "BUTTON" && e.target.textContent === "ANSWER") {
      if (!this.state.answering) {
        const body = this.state.body;
        this.setState({
          answering: true,
          body: {
            ...body,
            contentBody: [
              ...body.contentBody,
              {
                text: "ANSWER",
                type: "textarea",
                klass: "answer-content",
              },
            ],
          },
        });
      } else {
        handler();
      }
    }
    if (e.target.textContent === "REMOVE") {
      this.setState({ hide: true });
      discussion.removeDiscussion(this.state.discussionId);
    }
  });

  this.render = () => {
    this.state.hide
      ? $app.removeChild(this.$target)
      : (this.$target.style.display = "flex");

    const html = `
    <div class="modal__container">
      <header class="modal__title">${this.state.body.title}</header>
      ${this.state.body.beforeContent || ""}
      ${map((a) => ModalContent(a), this.state.body.contentBody).join("")}
      ${this.state.body.afterContent || ""}     
      ${ButtonList(this.state.btns)} 
    </div>`;

    this.$target.innerHTML = html;
  };
  $app.append(this.$target);
  this.render();
}
