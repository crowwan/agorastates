import { map } from "../utils/functional.js";

export default function ButtonList(btns) {
  console.log(btns);
  return `<div class="modal__btnList">
  ${
    btns &&
    map(
      (a) =>
        `<button class="modal__btnList--btn btn ${a.type}">${a.text}</button>`,
      btns
    ).join("")
  }
</div>`;
}
