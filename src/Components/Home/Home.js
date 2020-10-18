import { Drawer, Hidden, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TopNav from "./TopNav";
import { useDispatch, useSelector } from "react-redux";
import ChatTabs from "./ChatTabs";
import { isLoaded, useFirestore } from "react-redux-firebase";
import { getFeaturedRooms } from "../../Redux/Actions/RoomActions";
import DrawerHeader from "./DrawerHeader";
import { addNewRoom } from "../../Redux/Actions/RoomActions";
import Chat from "./Chat";
import { useParams } from "react-router-dom";

function Home() {
  const auth = useSelector((state) => state.firebase.auth);
  const uid = useSelector((state) => state.firebase.auth.uid);
  const username = useSelector((state) => state.firebase.profile.username);
  const userphoto = `https://avatars.dicebear.com/api/avataaars/${uid}.svg`;
  const rooms = useSelector((state) => state.firebase.profile.rooms);

  const firestore = useFirestore();
  const dispatch = useDispatch();
  const params = useParams();

  const addRoom = (name) => {
    const roomName = {
      name: name,
    };
    dispatch(addNewRoom({ firestore }, roomName, rooms, uid));
  };

  useEffect(() => {
    if (isLoaded(auth)) {
      dispatch(getFeaturedRooms({ firestore }));
    }
  }, [dispatch, auth, uid, firestore]);

  // drawer nav
  const [mobileopen, setMobileopen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileopen(!mobileopen);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TopNav
        username={username}
        photo={userphoto}
        handleDrawerToggle={handleDrawerToggle}
      />
      <nav>
        <Hidden smUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileopen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.paperDrawer,
            }}
            ModalProps={{
              keepMounted: true, //better open performance on mobile
            }}
          >
            <DrawerHeader addRoom={addRoom} />
            <ChatTabs />
          </Drawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            variant="permanent"
            open
            classes={{ paper: classes.paperDrawer }}
          >
            <DrawerHeader addRoom={addRoom} />
            <ChatTabs />
          </Drawer>
        </Hidden>
      </nav>
      <section className={classes.chatSection}>
        {params.roomId ? (
          <Chat roomId={params.roomId} rooms={rooms} />
        ) : (
          <p className={classes.startChat}>No Rooms Selected</p>
        )}
      </section>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paperDrawer: {
    width: "300px",
    backgroundColor: "#191927",
  },

  chatSection: {
    display: "flex",
    backgroundColor: "#222230",
    width: "100vw",
    height: "92vh",
    marginLeft: "300px",
    marginTop: "62px",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0",
    },
  },
  startChat: {
    padding: "15px",
    color: "#1eaab7",
    fontSize: "2.5rem",
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default Home;
