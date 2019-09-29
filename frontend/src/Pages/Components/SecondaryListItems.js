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
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
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
      <Tooltip title="Admin" placement="right-start">
        <ListItem button onClick={() => handleAdminClick()}>
          <ListItemIcon>
            <AssignmentInd />
          </ListItemIcon>
          <ListItemText primary="Administration" />
          {openAdmin ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </Tooltip>
      <Collapse in={openAdmin} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Tooltip title="Product Management" placement="right-start">
            <ListItem
              button
              className={classes.nested}
              component={Link}
              to="/manageproducts"
            >
              <ListItemIcon>
                <ShoppingBasket />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>
          </Tooltip>
          <Tooltip title="User Management" placement="right-start">
            <ListItem
              button
              className={classes.nested}
              component={Link}
              to="/manageusers"
            >
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </Tooltip>
        </List>
      </Collapse>
    </div>
  );
};

export default SecondaryListItems;
