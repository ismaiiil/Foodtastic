import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Fastfood from "@material-ui/icons/Fastfood";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";

import { useStyles } from "./navStyle";
import { Link } from "react-router-dom";
import { useStoreState } from "easy-peasy";

const MainListItems = () => {
  // const classes = useStyles();
  const cartItems = useStoreState(state => state.cart.cartItems);
  const isLogged = useStoreState(state => state.user.isLogged);

  return (
    <div>
      <Tooltip title="Products" placement="right-start">
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <Fastfood />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
      </Tooltip>

      <Tooltip title="Your cart" placement="right-start">
        <ListItem button component={Link} to="/cart">
          <ListItemIcon>
            <Badge color="secondary" badgeContent={cartItems.length}>
              <ShoppingCartIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Your Cart" />
        </ListItem>
      </Tooltip>

      {isLogged ? (
        <Tooltip title="Your profile" placement="right-start">
          <ListItem button component={Link} to="/profile">
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Your Profile" />
          </ListItem>
        </Tooltip>
      ) : null}
    </div>
  );
};

export default MainListItems;
