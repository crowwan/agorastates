import { $ } from "../utils/query.js";
import { makeModal } from "./makeModal.js";
export const setView = (user) => {
  const canDisable = document.querySelectorAll(".can-disable");

  if (user === "") {
    console.log("dis");
    canDisable.forEach((e) => (e.disabled = true));
  } else {
    canDisable.forEach((e) => (e.disabled = false));
  }
};

export default (function () {
  return {
    showModal(sel) {
      const curModal = $(".modal");
      curModal.style.display = "flex";
      makeModal(sel);
    },
  };
})();
