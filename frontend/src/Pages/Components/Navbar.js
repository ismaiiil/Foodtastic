import React, { useEffect } from "react";
import clsx from "clsx";
import axios from "axios";
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
import { withRouter } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MainListItems from "./MainListItems";
import SecondaryListItems from "./SecondaryListItems";
import { useStyles } from "./navStyle";
import { useStoreState, useStoreActions } from "easy-peasy";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputBase from "@material-ui/core/InputBase";
import Tooltip from "@material-ui/core/Tooltip";
import Cart from "../Cart/cart";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
const Navbar = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [url, setUrl] = React.useState("");
  const signOutRes = useStoreActions(actions => actions.user.signOutRes);
  const signedOut = useStoreState(state => state.user.signedOut);
  const isLogged = useStoreState(state => state.user.isLogged);
  const setIsLogged = useStoreActions(actions => actions.user.setIsLogged);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [values, setValues] = React.useState({
    filter: ""
  });
  const searchList = useStoreState(state => state.user.searchList);
  const setSearchList = useStoreActions(actions => actions.user.setSearchList);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const onSearchChange = () => event => {
    setSearch(event.target.value);
  };
  const handleSearch = () => {
    axios.get(url + search).then(res => {
      let data = res.data;
      console.log(data);
      setSearchList(data);
      props.history.push("/searchresults");
    });

    console.log(props);
    console.log(searchList);
  };
  useEffect(() => {
    switch (values.filter) {
      case 1:
        setUrl(
          "http://10.0.0.10/?resources=products&action=search&name=" + search
        );
        break;
      case 2:
        setUrl(
          "http://10.0.0.10/?resources=products&action=search&name=" +
            search +
            "&city=Paris"
        );
        break;
      case 3:
        setUrl(
          "http://10.0.0.10/?resources=products&action=search&name=" +
            search +
            "&city=Marseille"
        );
        break;
      case 4:
        setUrl(
          "http://10.0.0.10/?resources=products&action=search&name=" +
            search +
            "&city=Montreal"
        );
        break;
      case 5:
        setUrl(
          "http://10.0.0.10/?resources=products&action=search&name=" +
            search +
            "&city=Berlin"
        );
        break;
      case 6:
        setUrl(
          "http://10.0.0.10/?resources=products&action=search&name=" +
            search +
            "&city=Rome"
        );
        break;
      case 7:
        setUrl(
          "http://10.0.0.10/?resources=products&action=search&name=" +
            search +
            "&category=vegetable"
        );
        break;
      case 8:
        setUrl(
          "http://10.0.0.10/?resources=products&action=search&name=" +
            search +
            "&category=fruit"
        );
        break;
      case 9:
        setUrl(
          "http://10.0.0.10/?resources=products&action=search&name=" +
            search +
            "&category=meat"
        );
        break;
      case 10:
        setUrl(
          "http://10.0.0.10/?resources=products&action=search&name=" +
            search +
            "&category=dairy"
        );
        break;
    }
  }, [values]);

  const emptyCartItems = useStoreActions(
    actions => actions.cart.emptyCartItems
  );
  const handleSignOut = () => {
    let url = "http://10.0.0.10/?resources=customer&action=logout";

    signOutRes(url);
    if (signedOut) {
      setIsLogged(false);
      emptyCartItems();
      props.history.push("/");
    } else {
      return;
    }
  };

  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const cartItems = useStoreState(state => state.cart.cartItems);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleSubmit = () => {
    let post = { resources: "sales", products: cartItems };
    const bodyFormData = new FormData();
    bodyFormData.append(post);
    axios
      .post("http://10.0.0.10/", { resources: "sales", products: cartItems })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
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
          <Link to="/" className={classes.link}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              FoodTastic
            </Typography>
          </Link>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="filter" className={classes.whiteText}>
              Filter
            </InputLabel>
            <Select
              className={classes.selection}
              value={values.filter}
              onChange={handleChange}
              inputProps={{
                name: "filter",
                id: "filter"
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Name</MenuItem>
              <MenuItem value={2}>Paris</MenuItem>
              <MenuItem value={3}>Marseille</MenuItem>
              <MenuItem value={4}>Montreal</MenuItem>
              <MenuItem value={5}>Berlin</MenuItem>
              <MenuItem value={6}>Rome</MenuItem>
              <MenuItem value={7}>Vegetables</MenuItem>
              <MenuItem value={8}>Fruits</MenuItem>
              <MenuItem value={9}>Meat</MenuItem>
              <MenuItem value={10}>Dairy</MenuItem>
            </Select>
          </FormControl>
          <div className={classes.search}>
            <InputBase
              placeholder="Search…"
              value={search}
              onChange={onSearchChange()}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />

            <IconButton color="inherit" onClick={() => handleSearch()}>
              <SearchIcon />
            </IconButton>
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
                badgeContent={cartItems.length}
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
              onClick={() => handleSignOut()}
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
        <DialogTitle id="form-dialog-title">Your Cart</DialogTitle>

        <DialogContent style={{ width: "100%" }}>
          <Cart displayTitle={false}></Cart>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog()} color="primary">
            Close
          </Button>
          <Button onClick={() => handleCloseDialog()} color="primary">
            Checkout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default withRouter(Navbar);
