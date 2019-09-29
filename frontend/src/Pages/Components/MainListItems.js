import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Badge from "@material-ui/core/Badge";

import { useStyles } from "./navStyle";

const MainListItems = () => {
  const classes = useStyles();

  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <Badge color="secondary" badgeContent={4}>
            <ShoppingCartIcon />
          </Badge>
        </ListItemIcon>
        <ListItemText primary="Your Cart" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        <ListItemText primary="Your Profile" />
      </ListItem>
    </div>
  );
};

export default MainListItems;
