import { createReducer } from "../../Utils/CreateReducer";
import { SET_MESSAGES } from "../Constants";

const initialState = { messages: [] };

const setMessages = (state, payload) => {
  return {
    ...state,
    messages: [...payload],
  };
};

export default createReducer(initialState, {
  [SET_MESSAGES]: setMessages,
});
