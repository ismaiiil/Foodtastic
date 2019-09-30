import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { withRouter } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useStoreActions } from "easy-peasy";

const useStyles = makeStyles(theme => ({
  card: {
    width: "60%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },

  avatar: {
    backgroundColor: red[500]
  }
}));

const ViewProduct = props => {
  const setCartItems = useStoreActions(actions => actions.cart.setCartItems);
  let count = 0;
  const handleAddToCart = card => {
    count++;
    console.log(card);
    if (count <= card.STOCK_QTY) {
      setCartItems(card);
    } else {
      console.log("quantity reached");
    }
  };
  const classes = useStyles();
  const card = props.location.state;
  return (
    <Box display="flex" justifyContent="center">
      <Card className={classes.card}>
        <CardHeader title={card.PROD_NAME} />
        <CardMedia
          className={classes.media}
          image={card.FOOD_IMG}
          title="Paella dish"
        />
        {console.log(card)}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {card.FOOD_CAT}
          </Typography>
          <Typography>{card.PROD_NETPR + "€"}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            size="small"
            color="primary"
            onClick={() => handleAddToCart(card)}
          >
            Add to cart
          </Button>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
};

export default withRouter(ViewProduct);
