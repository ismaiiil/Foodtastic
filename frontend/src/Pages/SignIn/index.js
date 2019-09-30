import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./style";
import Container from "@material-ui/core/Container";
import { useStoreActions } from "easy-peasy";

const SignIn = props => {
  const classes = useStyles();
  const fetchUser = useStoreActions(actions => actions.user.fetchUser);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignIn = () => {
    let url =
      "http://10.0.0.10/?resources=customer&action=login&username=" +
      username +
      "&password=" +
      password;
    console.log(url);
    fetchUser(url);
    props.history.push("/");
  };

  const onPasswordChange = () => event => {
    setPassword(event.target.value);
  };
  const onUsernameChange = () => event => {
    setUsername(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={username}
            onChange={onUsernameChange()}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            value={password}
            type="password"
            id="password"
            onChange={onPasswordChange()}
            autoComplete="current-password"
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => handleSignIn()}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup">
                <li> {"Don't have an account? Sign Up"}</li>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
