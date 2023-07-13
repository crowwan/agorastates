import { $c } from "../../utils/createElement.js";
import { $ } from "../../utils/query.js";
import AsideL from "./Aside-l.js";
import { filterBy } from "../../data/filterBy.js";
import { filter, go, map } from "../../utils/functional.js";
import DiscussionSection from "./DiscussionSection.js";
import storage from "../../storage/storage.js";
import { user } from "../../user/user.js";
import { discussion } from "../../discussion/discussions.js";
import Modal from "../ui/Modal.js";

export default function Main($app, initialState) {
  this.$target = $c("main");
  this.state = initialState || {
    discussions: discussion.getDiscussions(),
    page: 0,
  };

  discussion.subscribe(this);

  this.setState = (newState) => {
    this.state = { ...this.state, ...newState };
    const filterState = map((e) => {
      return { ...e, selected: false };
    }, filterBy);
    asidel.setState({ tag: filterState });
    // asidem.setState({ tag: filterState });
    this.render();
  };

  const filterState = map((e) => {
    return { ...e, selected: false };
  }, filterBy);
  const newDiscussionContent = [
    {
      text: "TITLE",
      type: "input",
      klass: "new-discussion-title",
    },
    {
      text: "TAG",
      type: "input",
      klass: "new-discussion-tag",
    },
    {
      text: "CONTENT",
      type: "textarea",
      klass: "new-discussion-content",
    },
  ];

  this.render = () => {
    const onSubmit = () => {
      const $title = $(".new-discussion-title");
      const $content = $(".new-discussion-content");
      const $tag = $(".new-discussion-tag");

      const id = Date.now().toString();
      const userList = storage.getData("user");
      const currentUser = userList[user.getCurrentUser()];

      discussion.addDiscussion(id, {
        id,
        author: currentUser.id,
        bodyHTML: $content.value,
        title: $title.value,
        tag: $tag.value.toLowerCase(),
        avatarUrl: currentUser.url,
        createdAt: new Date().toISOString(),
        answer: null,
      });
    };

    const onTagClick = (e) => {
      if (e.target.dataset.filtername) {
        const filterName = e.target.dataset.filtername;
        const newState = {
          tag: map((e) => {
            if (e.name === filterName) {
              e.selected = !e.selected;

              let discussions = e.selected
                ? go(
                    Object.values(this.state.discussions),
                    filterName === "unanswered"
                      ? filter((e) => !e.answer)
                      : filter((e) => e.tag === filterName)
                  ).reduce((cur, acc) => ((cur[acc.id] = acc), cur), {})
                : this.state.discussions;

              discussionSection.setState({
                start: 0,
                page: 0,
                last: Math.ceil(Object.values(discussions).length / 10),
                discussions,
              });
            } else {
              e.selected = false;
            }
            return e;
          }, filterState),
        };
        asidel.setState(newState);
      } else if (e.target.tagName === "BUTTON") {
        new Modal(
          this.$target,
          {
            hide: false,
            body: {
              title: "NEW DISCUSSION",
              contentBody: newDiscussionContent,
            },
            btns: [
              {
                type: "",
                text: "SUBMIT",
              },
            ],
          },
          onSubmit
        );
      }
    };
    const asidel = new AsideL(
      this.$target,
      {
        tag: filterState,
      },
      onTagClick
    );
    const discussionSection = new DiscussionSection(this.$target, {
      start: 0,
      page: 0,
      last: Math.ceil(Object.values(this.state.discussions).length / 10),
      discussions: this.state.discussions,
    });
  };

  $app.append(this.$target);
  this.render();
}
