import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../Redux/Reducers/RootReducer";
import thunk from "redux-thunk";

export const configureStore = () => {
  const middlewares = [thunk];

  const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

  return createStore(rootReducer, composedEnhancer);
};
