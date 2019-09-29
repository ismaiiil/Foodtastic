import React, { useState } from "react";
import { Container, Snackbar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { message: "Hello", id: "1" },
    { message: "Products1", id: "1" },
    { message: "Products2", id: "1" },
    { message: "Prodcuts3", id: "1" }
  ]);
  const handleClose = () => {};
  return (
    <Container maxWidth="sm">
      {cartItems.map(item => (
        <Snackbar
          open
          autoHideDuration={4000}
          ContentProps={{
            "aria-describedby": "snackbar-fab-message-id"
          }}
          message={<span id="snackbar-fab-message-id">{item.message}</span>}
          action={
            <Button color="inherit" size="small" onClick={() => handleClose()}>
              Delete
            </Button>
          }
          // className={classes.snackbar}
        />
      ))}
    </Container>
  );
};

export default Cart;
