import React, { useState } from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import { useStoreState, useStoreActions } from "easy-peasy";
import axios from "axios";
const useStyles = makeStyles(theme => ({
  cart: {
    padding: theme.spacing(2)
  },
  listInnerItems: {
    width: "100px",
    padding: theme.spacing(1)
  },
  checkoutBtn: {
    alignSelf: "flex-end"
  }
}));
const Cart = props => {
  const cartItems = useStoreState(state => state.cart.cartItems);
  const removeCartItemAtIndex = useStoreActions(
    actions => actions.cart.removeCartItemAtIndex
  );
  const handleDeleteCartItem = () => event => {
    console.log("Clicked");
    removeCartItemAtIndex(event.target.id);
    console.log(event.target.id);
  };
  const handleSubmit = () => {
    let post = { resources: "sales", products: cartItems };
    
    axios
      .post("http://10.0.0.10/",
      {headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }}
      , { post }
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <Box
        display="flex"
        flexDirection="column"
        style={{ width: "100%" }}
        alignItems="center"
      >
        {props.displayTitle ? (
          <Typography variant="h6" className={classes.title}>
            Your Cart
          </Typography>
        ) : null}
        <div
          className={classes.demo}
          style={{ width: "100%" }}
          className={classes.cart}
        >
          <List dense={true}>
            {cartItems.map((item, key) => (
              <React.Fragment>
                <ListItem id={key}>
                  <ListItemAvatar className={classes.listInnerItems}>
                    <Avatar src={item.FOOD_IMG} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.PROD_NAME}
                    className={classes.listInnerItems}
                  />
                  <ListItemText
                    primary={item.PROD_NETPR + "€"}
                    className={classes.listInnerItems}
                  />
                  <ListItemText
                    primary={"Quantity"}
                    className={classes.listInnerItems}
                  />
                  <ListItemSecondaryAction className={classes.listInnerItems}>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={handleDeleteCartItem()}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
            <ListItem>
              <ListItemAvatar
                className={classes.listInnerItems}
              ></ListItemAvatar>
              <ListItemText
                primary="Total Amount"
                className={classes.listInnerItems}
              />
              <ListItemText primary="1.3$" className={classes.listInnerItems} />
              <ListItemText primary={""} className={classes.listInnerItems} />
              <ListItemSecondaryAction className={classes.listInnerItems}>
                <IconButton edge="end" aria-label="delete"></IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem></ListItem>
          </List>
        </div>
        {props.displayTitle ? (
          <Button
            variant="contained"
            color="primary"
            className={classes.checkoutBtn}
            onClick={() => {
              handleSubmit();
            }}
          >
            Checkout
          </Button>
        ) : null}
      </Box>
    </React.Fragment>
  );
};

export default Cart;
