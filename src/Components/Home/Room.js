import { Avatar, makeStyles } from "@material-ui/core";

import React from "react";

function Room({ roomName, roomId }) {
  const classes = useStyles();
  return (
    <div className={classes.room}>
      <Avatar
        src={`https://avatars.dicebear.com/api/avataaars/${roomId}.svg`}
      />
      <p>{roomName}</p>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  room: {
    display: "flex",
    alignItems: "center",
    // backgroundColor: "#222230",
    padding: "5px",
    flex: "0 0 100%",

    "& p": {
      color: "#1eaab7",
      marginLeft: "1.2rem",
      paddingRight: "0.5rem",
      maxHeight: "3ch",
      maxWidth: "133px",
      overflow: "hidden",
      fontWeight: "600",
    },
  },
}));

export default Room;
