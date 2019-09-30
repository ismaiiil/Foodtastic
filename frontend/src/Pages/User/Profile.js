import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useStoreState } from "easy-peasy";
import { useStyles } from "../SignIn/style";

const Profile = props => {
  const classes = useStyles();
  const user = useStoreState(state => state.user.user);
  console.log(user);
  const [state, setState] = React.useState([
    {
      username: user.username,
      firstname: user.firstName,
      lastname: user.lastName,
      address: user.address,
      city: user.city,
      zipcode: user.zipCode,
      password: user.password
    }
  ]);

  const handleSaveChanges = () => {};
  const onHandleChange = () => event => {
    setState(oldValues => ({
      ...oldValues,
      [event.target.id]: event.target.value
    }));
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
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={state.username}
            onChange={onHandleChange()}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="firstname"
            label="First Name"
            value={state.firstname}
            type="text"
            id="firstname"
            onChange={onHandleChange()}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastname"
            label="Last Name"
            value={state.lastname}
            type="text"
            id="lastname"
            onChange={onHandleChange()}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="address"
            label="Address"
            value={state.address}
            type="text"
            id="address"
            onChange={onHandleChange()}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="city"
            label="City"
            value={state.city}
            type="text"
            id="city"
            onChange={onHandleChange()}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="zip"
            label="Zip Code"
            value={state.zipcode}
            type="text"
            id="zipcode"
            onChange={onHandleChange()}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            value={state.password}
            type="password"
            id="password"
            onChange={onHandleChange()}
            autoComplete="current-password"
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => handleSaveChanges()}
          >
            Update Profile
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default Profile;
