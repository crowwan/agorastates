import toStringFormat from "../utils/toStringFormat.js";

export default function DiscussionModalInfo(props) {
  return `
  <div class='modal__text modal__discussionInfo'>
    <span>author: ${props.author}</span>
    <span>tag: ${props.tag}</span>
    <span>created: ${toStringFormat(new Date(props.createdAt))}</span>
  </div>`;
}
