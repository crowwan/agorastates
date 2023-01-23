import { $c } from "../utils/createElement.js";
import toStringByFormatting from "../utils/toStringFormat.js";
import DiscussionModalInfo from "./DiscussionModalInfo.js";
import Modal from "./ui/Modal.js";
import { discussion } from "../discussion/discussions.js";
import { user } from "../user/user.js";
import { $ } from "../utils/query.js";

export default function DiscussionItem($app, props) {
  const $li = $c("li");
  $li.className = "discussions";
  $li.dataset.discussionid = props.id;
  const curDiscussion = discussion.getDiscussions()[props.id];

  const answerHandler = () => {
    console.log("answered");
    const $answer = $(".answer-content");
    const curDiscussion = discussion.getDiscussions()[props.id];
    const createdAt = new Date().toISOString();
    curDiscussion.answer = {
      author: user.getCurrentUser(),
      bodyHTML: $answer.value,
      createdAt,
      id: Date.now(),
    };
    discussion.setDiscussion(props.id, curDiscussion);
  };

  const getBtns = () =>
    user.getCurrentUser()
      ? curDiscussion.author === user.getCurrentUser()
        ? [{ type: "btn-remove", text: "REMOVE" }]
        : !curDiscussion.answer
        ? [{ type: "answer", text: "ANSWER" }]
        : []
      : [];

  const contentBody = [
    { text: "TITLE", type: "div", klass: "", content: curDiscussion.title },
    {
      text: "CONTENT",
      type: "div",
      klass: "",
      content: curDiscussion.bodyHTML,
    },
    curDiscussion.answer && {
      text: "ANSWER",
      type: "div",
      klass: "",
      content: curDiscussion.answer.bodyHTML,
    },
  ];
  $li.addEventListener("click", () => {
    new Modal(
      $app,
      {
        discussionId: $li.dataset.discussionid,
        hide: false,
        answering: false,
        body: {
          title: "DISCUSSION",
          beforeContent: DiscussionModalInfo(
            discussion.getDiscussions()[$li.dataset.discussionid]
          ),
          contentBody,
        },
        btns: getBtns(),
      },
      answerHandler
    );
  });

  const tmpl = `
    <img src=${props.avatarUrl} class="discussions__tagImage" />
    <div class="discussions__contentBox">
      <div class="discussions_title">
        ${props.title}
      </div>
      <div class="discussions__infoBox">
        <div class="discussions__author">${props.author}</div>
        <div class="discussions__createAt">${toStringByFormatting(
          new Date(props.createdAt)
        )}</div>
      </div>
    </div>
    <div class="discussions__answered ${
      props.answer ? "answered" : ""
    }">Answered</div>
  `;
  $li.innerHTML = tmpl;
  return $li;
}
