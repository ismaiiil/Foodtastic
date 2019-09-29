import React from "react";
import clsx from "clsx";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MainListItems from "./MainListItems";
import SecondaryListItems from "./SecondaryListItems";
import { useStyles } from "./navStyle";
import { useStoreState, useStoreActions } from "easy-peasy";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputBase from "@material-ui/core/InputBase";
import Tooltip from "@material-ui/core/Tooltip";

const Navbar = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const signOut = () => {
    setIsLogged(false);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const isLogged = useStoreState(state => state.user.isLogged);
  const setIsLogged = useStoreActions(actions => actions.user.setIsLogged);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            FoodTastic
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Tooltip title="Your Cart">
            <IconButton
              aria-label="delete"
              className={classes.navBtn}
              size="medium"
              color="inherit"
            >
              <Badge
                color="secondary"
                badgeContent={4}
                onClick={() => handleClickOpenDialog()}
              >
                <ShoppingCartIcon fontSize="inherit" />
              </Badge>
            </IconButton>
          </Tooltip>
          {isLogged ? (
            <Button
              variant="outlined"
              className={classes.navBtn}
              color="inherit"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          ) : (
            <React.Fragment>
              <Button
                variant="outlined"
                className={classes.navBtn}
                color="inherit"
                component={Link}
                to="/signin"
              >
                Sign In
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/signup"
                className={classes.navBtn}
                color="inherit"
              >
                Sign Up
              </Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems />
        </List>
        <Divider />
        <List>
          <SecondaryListItems />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {props.children}
        </Container>
      </main>

      <Dialog
        open={openDialog}
        onClose={() => handleCloseDialog()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleCloseDialog()} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Navbar;
