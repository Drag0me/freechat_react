import {
  AppBar,
  Avatar,
  ClickAwayListener,
  Grow,
  IconButton,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Toolbar,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

function TopNav({ username, photo, handleDrawerToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const firebase = useFirebase();
  const history = useHistory();

  const handleLogout = (e) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
        console.log("logout sucessful");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // for menu options
  const anchorRef = useRef(null);

  const handleMenuToggle = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };
  const handleMenuClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }

    setMenuOpen(false);
  };
  const handleListKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      setMenuOpen(false);
    }
  };
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(menuOpen);
  useEffect(() => {
    if (prevOpen.current === true && menuOpen === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = menuOpen;
  }, [menuOpen]);

  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton className={classes.menuButton} onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
        <div className={classes.appBarRight}>
          <p>{username}</p>
          <IconButton onClick={handleMenuToggle} ref={anchorRef}>
            <Avatar src={photo} />
          </IconButton>
          <Popper
            className={classes.menuPopper}
            open={menuOpen}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper className={classes.menuPopper}>
                  <ClickAwayListener onClickAway={handleMenuClose}>
                    <MenuList
                      className={classes.menuListItem}
                      autoFocusItem={menuOpen}
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - 300px)`,
      marginLeft: "300px",
    },
    backgroundColor: "#191927",
    display: "flex",
  },
  appBarRight: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",

    "& p": {
      color: "#cf8f94",
      maxHeight: "3ch",
      maxWidth: "160px",
      overflow: "hidden",
    },
  },
  menuPopper: {
    backgroundColor: "#191927",
  },
  menuListItem: {
    color: "#cf8f94",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export default TopNav;
