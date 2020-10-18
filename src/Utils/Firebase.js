import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCp5J3sd9gCrqMp0pim6ACMDVP4CnKfLlU",
  authDomain: "freechat-in.firebaseapp.com",
  databaseURL: "https://freechat-in.firebaseio.com",
  projectId: "freechat-in",
  storageBucket: "freechat-in.appspot.com",
  messagingSenderId: "637387644231",
  appId: "1:637387644231:web:9954fa99a34dbce4e24062",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
