import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import Group from "@material-ui/icons/Group";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import { useStyles } from "./navStyle";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
const SecondaryListItems = () => {
  const classes = useStyles();

  const [openAdmin, setOpenAdmin] = React.useState(false);
  const handleAdminClick = () => {
    setOpenAdmin(!openAdmin);
  };
  return (
    <div>
      <ListItem button onClick={() => handleAdminClick()}>
        <ListItemIcon>
          <AssignmentInd />
        </ListItemIcon>
        <ListItemText primary="Administration" />
        {openAdmin ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openAdmin} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ShoppingBasket />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
};

export default SecondaryListItems;
