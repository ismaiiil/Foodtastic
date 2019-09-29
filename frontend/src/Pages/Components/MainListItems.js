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

const MainListItems = () => {
  const classes = useStyles();

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
        <ListItem button>
          <ListItemIcon>
            <Badge color="secondary" badgeContent={4}>
              <ShoppingCartIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Your Cart" />
        </ListItem>
      </Tooltip>

      <Tooltip title="Your profile" placement="right-start">
        <ListItem button>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Your Profile" />
        </ListItem>
      </Tooltip>
    </div>
  );
};

export default MainListItems;
