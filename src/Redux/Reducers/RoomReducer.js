import { SET_FEATURED_ROOMS } from "../Constants";
import { createReducer } from "../../Utils/CreateReducer";

const initialState = { featured: [] };

const setFeaturedRooms = (state, payload) => {
  return {
    ...state,
    featured: [...payload],
  };
};

export default createReducer(initialState, {
  [SET_FEATURED_ROOMS]: setFeaturedRooms,
});
