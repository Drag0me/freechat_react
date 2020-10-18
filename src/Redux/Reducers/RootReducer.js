import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import ChatReducer from "./ChatReducer";
import RoomReducer from "./RoomReducer";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  rooms: RoomReducer,
  chat: ChatReducer,
});

export default rootReducer;
