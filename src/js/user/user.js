export const user = (() => {
  let currentUser = "";

  return {
    getCurrentUser() {
      return currentUser;
    },
    setCurrentUser(userId) {
      currentUser = userId;
    },
  };
})();
