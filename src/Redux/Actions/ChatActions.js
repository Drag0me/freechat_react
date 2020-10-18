import { SET_MESSAGES } from "../Constants";
import firebase from "firebase/app";

export const getMessages = ({ firestore }, roomId) => {
  return async (dispatch) => {
    try {
      await firestore
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .limit(30)
        .onSnapshot((snapshot) => {
          const messages = [];
          snapshot.docs.map((doc) => messages.push(doc.data()));
          dispatch(setMessages(messages));
        });
    } catch (err) {
      console.log("someerror");
      console.log(err.message);
    }
  };
};

const setMessages = (payload) => {
  return {
    type: SET_MESSAGES,
    payload: payload,
  };
};

export const sendMessage = ({ firestore }, roomId, uid, message) => {
  return async (dispatch) => {
    try {
      const createdMessage = {
        uid: uid,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      await firestore
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .add(createdMessage);
      console.log("message sent");
    } catch (err) {
      console.log("send message error")
      console.log(err.message);
    }
  };
};
