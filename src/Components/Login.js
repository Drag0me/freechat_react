import {
  Container,
  Grid,
  InputAdornment,
  makeStyles,
  OutlinedInput,
  Paper,
} from "@material-ui/core";
import NearMeIcon from "@material-ui/icons/NearMe";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { login } from "../Redux/Actions/AuthActions";

function Login() {
  const [username, setUsername] = useState("");

  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ firebase, firestore }, username));
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="md" className={classes.loginContainer}>
        <Paper elevation={3} className={classes.loginPaper}>
          <Grid container spacing={0} className={classes.grid}>
            <Grid item sm={6} className={classes.photoGrid}>
              <img
                src="./img/home_1.png"
                alt="message arrow"
                className={classes.image}
              />
            </Grid>
            <Grid item sm={6} className={classes.formGrid}>
              <h1 className={classes.brandLogo}>Free chat</h1>
              <form onSubmit={handleSubmit}>
                <OutlinedInput
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  classes={{
                    root: classes.input,
                    notchedOutline: classes.inputnotchedOutline,
                    focused: classes.focusedInput,
                  }}
                  variant="outlined"
                  placeholder="Enter username"
                  endAdornment={
                    <InputAdornment position="end">
                      <NearMeIcon style={{ color: "#1eaab7" }} />
                    </InputAdornment>
                  }
                  inputProps={{
                    "aria-label": "weight",
                  }}
                />
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: "#191927",
    display: "grid",
    placeItems: "center",
  },
  loginContainer: {
    height: "70%",
  },
  loginPaper: {
    backgroundColor: "#222230",
    height: "100%",
    width: "100%",
  },
  grid: {
    height: "100%",
  },
  photoGrid: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  image: {
    width: "90%",
    marginTop: "auto",
    marginBottom: "auto",
  },
  formGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  brandLogo: {
    color: "#1eaab7",
    fontSize: "4rem",
    marginTop: "4rem",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "40px",
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

export default Login;
