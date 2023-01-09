import { storageAPI } from "../../storage/storageAPI.js";
import { $c } from "../../utils/createElement.js";

import { filter, map } from "../../utils/functional.js";
export default function AsideL($app, initialState, onClick) {
  this.target = $c("aside");
  this.state = initialState;

  this.setState = (newState) => {
    this.state = { ...initialState, ...newState };
    console.log(this.state);
    this.render();
  };

  this.target.addEventListener("click", onClick);

  this.target.classList.add("filter__container");

  this.render = () => {
    console.log("render");
    const filterBy = this.state.tag;
    const tag = filter((e) => e.name !== "answer", filterBy);
    console.log(filterBy[filterBy.length - 1]);
    const html = `
    <button class="newDiscussion-btn btn can-disable">
      NEW DISCUSSION
    </button>
    <ul class="filter__tagsContainer">
      <span>TAGS</span>
      ${map((e) => {
        // console.log(e);
        console.log(e.selected);
        return `<li class = "filter__tags ${
          e.selected === true ? "selected" : ""
        }" data-filtername = ${e.name} >
      <img src=${e.url} class="filter__tagImg" />${e.name}
    </li>`;
      }, tag).join("")}
    </ul>

    <ul class="filter__filterContainer">
      <span>FILTER BY</span>
      <li data-filtername = 'answer' class=${
        filterBy[filterBy.length - 1].selected ? "selected" : ""
      }>answer</li>
    </ul>`;
    this.target.innerHTML = html;
  };

  $app.append(this.target);
  this.target.textContent = "test";
  this.render();
}
