import {
  AppBar,
  Box,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
} from "@material-ui/core";
import React, { useState } from "react";
import ChatIcon from "@material-ui/icons/Chat";
import ForumIcon from "@material-ui/icons/Forum";
import CloseIcon from "@material-ui/icons/Close";
import Room from "./Room";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { removeYourRoom } from "../../Redux/Actions/RoomActions";
import { useFirestore } from "react-redux-firebase";

function ChatTabs() {
  const yourRooms = useSelector((state) => state.firebase.profile.rooms);
  const featuredRooms = useSelector((state) => state.rooms.featured);

  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };
  const history = useHistory();

  const uid = useSelector((state) => state.firebase.auth.uid);
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const removeRoom = (roomId) => {
    let newRooms = yourRooms.filter((room) => room.roomId !== roomId);
    dispatch(removeYourRoom({ firestore }, newRooms, uid));
    history.push("/");
  };

  const classes = useStyle();
  return (
    <div>
      <AppBar position="static" className={classes.tabs}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            label="Your Rooms"
            className={classes.tabLabel}
            icon={<ChatIcon style={{ color: "#1eaab7" }} />}
          />
          <Tab
            label="Featured Rooms"
            className={classes.tabLabel}
            icon={<ForumIcon style={{ color: "#1eaab7" }} />}
          />
        </Tabs>
      </AppBar>

      <TabPanel value={tabValue} index={0}>
        {yourRooms &&
          yourRooms.map((room, index) => (
            <div className={classes.roomListContainer} key={index}>
              <NavLink
                to={`/chat/${room.roomId}`}
                className={classes.roomLink}
                activeClassName={classes.activeNav}
              >
                <Room roomName={room.roomName} roomId={room.roomId} />
              </NavLink>
              <IconButton
                className={classes.closeButton}
                onClick={() => removeRoom(room.roomId)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          ))}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {featuredRooms.map((room, index) => (
          <NavLink
            activeClassName={classes.activeNav}
            to={`/chat/${room.roomId}`}
            key={index}
            className={classes.roomListContainer}
          >
            <Room roomName={room.roomName} roomId={room.roomId} />
          </NavLink>
        ))}
      </TabPanel>
    </div>
  );
}

const useStyle = makeStyles((theme) => ({
  tabs: {
    backgroundColor: "#191927",
  },
  tabLabel: {
    color: "#cf8f94",
    textTransform: "none",
  },
  roomListContainer: {
    display: "flex",
    alignItems: "center",
    "& :hover": {
      backgroundColor: "#222230",
    },
  },
  activeNav: {
    backgroundColor: "#222230",
  },
  roomLink: {
    width: "100%",
  },
  closeButton: {
    color: "#1eaab7",
    marginLeft: "auto",
  },
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default ChatTabs;
