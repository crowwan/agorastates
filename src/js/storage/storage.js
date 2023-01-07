export default (function () {
  const storageList = ["user", "discussion", "discussionBody", "Answer", "tag"];

  return {
    getStorageList() {
      return [...storageList];
    },
  };
})();
