import {
  Container,
  InputAdornment,
  makeStyles,
  TextField,
} from "@material-ui/core";
import NearMeIcon from "@material-ui/icons/NearMe";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { getMessages } from "../../Redux/Actions/ChatActions";
import firebase from "firebase/app";
import { animateScroll } from "react-scroll";

function Chat({ roomId, rooms }) {
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const username = useSelector((state) => state.firebase.profile.username);
  const userUid = useSelector((state) => state.firebase.auth.uid);

  const [message, setMessage] = useState("");

  const uid = useSelector((state) => state.firebase.auth.uid);
  const sendMessage = (e) => {
    e.preventDefault();
    const createdMessage = {
      uid: uid,
      username: username,
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    firestore
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add(createdMessage)
      .catch((err) => {
        console.log(err.message);
      });
    setMessage("");
  };

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "chat_body",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    dispatch(getMessages({ firestore }, roomId));
  }, [roomId, dispatch, firestore]);

  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.chatContainer}>
      <div className={classes.chatbody} id="chat_body">
        {messages.length > 0 &&
          messages.map((message) => (
            <p
              className={`${classes.message} ${
                message.uid === userUid && classes.messageSent
              }`}
            >
              <span className={classes.chatName}>{message.username}</span>
              {message.message}
            </p>
          ))}
      </div>
      <form className={classes.chatFooter} onSubmit={sendMessage}>
        <TextField
          classes={{
            root: classes.messageInput,
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="type your message here ..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" className={classes.sendIcon}>
                <NearMeIcon style={{ color: "#1eaab7" }} />
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
    height: "92%",
    border: "4px solid #191927",
    borderRadius: "15px",
    padding: "0",
  },
  chatFooter: {
    marginTop: "auto",
    width: "100%",
    backgroundColor: "#323245",
    borderRadius: "15px",
  },
  messageInput: {
    width: "95%",
    padding: "10px",
    fontSize: "15px",
    "& .MuiInputBase-root": {
      color: "#cf8f94",
    },
  },
  sendIcon: {
    marginRight: "10px",
  },
  chatbody: {
    flex: "1",
    padding: "30px",
    overflowY: "scroll",
  },
  message: {
    position: "relative",
    fontSize: "16px",
    padding: "10px",
    backgroundColor: "white",
    borderRadius: "10px",
    width: "fit-content",
    marginBottom: "30px",
  },
  messageSent: {
    marginLeft: "auto",
    color: "#cf8f94",
    backgroundColor: "#191927",
  },
  chatName: {
    position: "absolute",
    top: "-15px",
    fontWeight: "800",
    fontSize: "xx-small",
    color: "#1eaab7",
  },
}));

export default Chat;
