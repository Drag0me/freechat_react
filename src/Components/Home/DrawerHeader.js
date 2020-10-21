import {
  IconButton,
  InputAdornment,
  makeStyles,
  Modal,
  OutlinedInput,
  Tooltip,
} from "@material-ui/core";
import NearMeIcon from "@material-ui/icons/NearMe";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import React, { useState } from "react";

function DrawerHeader({ addRoom }) {
  const [modalOpen, setModelOpen] = useState(false);
  const [roomInput, setRoomInput] = useState("");

  const roomInputSubmit = (e) => {
    e.preventDefault();
    if (roomInput.length > 30) {
      console.log("Room name should not be longer than 30 characters");
    } else {
      addRoom(roomInput);
    }
    setRoomInput("");
    setModelOpen(false);
  };

  const handleOpenModel = () => {
    setModelOpen(true);
  };
  const handleCloseModel = () => {
    setModelOpen(false);
  };

  const classes = useStyles();
  return (
    <div className={classes.drawerHeader}>
      <h2 className={classes.drawerLogo}>Free chat</h2>
      <Tooltip title="Add Chat" placement="right">
        <IconButton style={{ color: "#1eaab7" }} onClick={handleOpenModel}>
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Modal open={modalOpen} onClose={handleCloseModel}>
        <div className={classes.modalPaper}>
          <form onSubmit={roomInputSubmit}>
            <OutlinedInput
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value)}
              classes={{
                root: classes.input,
                notchedOutline: classes.inputnotchedOutline,
                focused: classes.focusedInput,
              }}
              variant="outlined"
              placeholder="Enter Room name"
              endAdornment={
                <InputAdornment position="end" onClick={roomInputSubmit}>
                  <NearMeIcon style={{ color: "#1eaab7", cursor: "pointer" }} />
                </InputAdornment>
              }
              inputProps={{
                "aria-label": "weight",
              }}
            />
          </form>
        </div>
      </Modal>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    alignItems: "center",
  },
  drawerLogo: {
    color: "#1eaab7",
  },
  modalPaper: {
    position: "absolute",
    width: "250px",
    backgroundColor: "#191927",
    border: "2px solid #191927",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    left: "40%",
    top: "40%",
  },
  modalForm: {
    display: "flex",
    flexDirection: "column",
    margin: "20px",
  },
  input: {
    color: "#cf8f94",
  },
  focusedInput: {
    borderColor: "#1eaab7",
  },
  inputnotchedOutline: {
    borderColor: "#1eaab7",
  },
}));

export default DrawerHeader;
