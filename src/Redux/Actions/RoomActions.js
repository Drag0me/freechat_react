import { SET_FEATURED_ROOMS } from "../Constants";

export const getFeaturedRooms = ({ firestore }) => {
  return async (dispatch) => {
    try {
      const snapshot = await firestore
        .collection("rooms")
        .where("featured", "==", true)
        .get();
      if (snapshot.empty) {
        console.log("no documents");
      } else {
        const featuredRooms = [];
        snapshot.forEach((doc) => {
          const data = {
            roomId: doc.id,
            roomName: doc.data().name,
            roomUsers: doc.data().users,
          };
          featuredRooms.push(data);
        });
        dispatch(setFeaturedRooms(featuredRooms));
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

const setFeaturedRooms = (payload) => {
  return {
    type: SET_FEATURED_ROOMS,
    payload: payload,
  };
};

export const addNewRoom = ({ firestore }, roomName, rooms, uid) => {
  // add it to remote state
  return async (dispatch) => {
    try {
      const res = await firestore.collection("rooms").add(roomName);
      const id = res.id;
      const room = {
        roomId: id,
        roomName: roomName.name,
      };
      await firestore
        .collection("users")
        .doc(uid)
        .update({ rooms: [room, ...rooms] });
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeYourRoom = ({ firestore }, rooms, uid) => {
  return async (dispatch) => {
    try {
      await firestore
        .collection("users")
        .doc(uid)
        .update({ rooms: [...rooms] });
    } catch (err) {
      console.log(err.message);
    }
  };
};
