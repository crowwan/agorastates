import { $ } from "../utils/query.js";

export const makeModal = (type, ...info) => {
  const modalTitle = $(".modal__title");
  const container = $(".modal__container");

  const typeMap = {
    signUp: { title: "SIGN UP", body: ["ID", "PASSWORD"] },
    newDis: { title: "NEW DISCUSSION", body: ["TITLE", "CONTENT"] },
    dis: { title: "DISCUSSION", body: ["TITLE", "DESCRIPTION", "ANSWER"] },
    answer: { title: "ANSWER TO DISCUSSION", body: ["TITLE", "CONTENT"] },
  };
  modalTitle.textContent = typeMap[type].title;

  for (const a of typeMap[type].body) {
    console.log(a);
    const modalContent = makeModalContent(a);
    container.append(modalContent);
  }
};
function makeModalContent(text) {
  const modalContent = document.createElement("div");
  const modalText = document.createElement("div");
  const modalBody =
    text === "CONTENT"
      ? document.createElement("textarea")
      : text === "ID" || text == "PASSWORD"
      ? document.createElement("input")
      : document.createElement("div");
  modalContent.className = "modal__contentBody";
  modalText.classList.add("modal__bodyText", "modal__text");
  modalText.textContent = text;

  const btnList = document.createElement("div");
  // TODO: 버튼 타입 맵 순회하면서 버튼 만들고 btnList에다가 추가하기
  if (modalBody.tagName === "DIV") modalBody.classList.add("modal__body");
  else if (modalBody.tagName === "INPUT") {
    console.log("input");
    modalBody.classList.add("modal__input");
  }
  btnList.classList.add("modal__btnList");

  modalContent.append(modalText, modalBody, btnList);

  return modalContent;
}
