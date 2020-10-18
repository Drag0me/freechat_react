export const login = ({ firebase, firestore }, username) => {
  return async (dispatch) => {
    try {
      let createdUser = await firebase.auth().signInAnonymously();

      const user = {
        username: username,
        rooms: [],
      };

      await firestore.collection("users").doc(createdUser.user.uid).set(user);
      console.log("signin successful");
    } catch (err) {
      console.log(err.message);
      console.log("signin error");
    }
  };
};
