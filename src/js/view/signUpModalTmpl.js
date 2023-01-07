import { $ } from "../utils/query.js";

export const signUpModalTmpl = (type) => {};

`<section class="signIn modal">
<div class="signIn__modal">
  <header class="signIn__modalTitle modal-title">SIGN IN</header>
  <fieldset>
    <div class="inputTitle">
      <div class="inputTitle__text modal-text">ID</div>
      <input class="inputId__input" />
    </div>
    <div class="inputPassword">
      <div class="inputBody__text modal-text">PASSWORD</div>
      <input type="password" class="inputPassword__input" />
    </div>
    <div class="signIn__btnList">
      <button class="sigIn__btn btn">SIGN IN</button>
    </div>
  </fieldset>
</div>
</section>``
<section class="modal">
  <div class="modal__container">
    <header class="modal__title">
      ANSWER TO DISCUSSION
    </header>
    <div class="modal__inputTitle">
      <div class="inputTitle__text modal-text">TITLE</div>
      <input class="inputTitle__input answer-input-title" />
    </div>
    <div class="modal__inputBody">
      <div class="inputBody__text modal-text">DISCUSSION</div>
      <textarea
        type="text"
        class="inputBody__input answer-input-body"
      ></textarea>
    </div>
    <div class="modal__btnList">
      <button class="modal__btnList--submit btn">SUBMIT</button>
    </div>
  </div>
</section>``<section class="discussion modal">
<div class="discussion__modal">
  <header class="discussion__modalTitle modal-title">
    DISCUSSION
  </header>
  <fieldset>
    <div class="inputTitle">
      <div class="inputTitle__text modal-text">TITLE</div>
      <div class="discussion-title">
        titletitletitletitletitletitle
      </div>
    </div>
    <div class="inputBody">
      <div class="inputBody__text modal-text">DISCUSSION</div>
      <div class="discussion-body">
        asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasddasd
      </div>
    </div>
    <div class="newDiscussion__btnList">
      <button class="discussion__submitBtn btn can-disable">
        ANSWER
      </button>
      <button class="discussion__submitBtn btn can-disable">
        EDIT
      </button>
      <button class="discussion__submitBtn btn can-disable">
        REMOVE
      </button>
    </div>
  </fieldset>
</div>
</section>`;
