import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Box, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },

  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    paddingLeft: "0px",
    paddingRight: "0px"
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Products = props => {
  const classes = useStyles();
  const [productList, setProductList] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    axios.get("http://10.0.0.10/?resources=products&action=all").then(res => {
      let data = res.data;
      setProductList(data);
      setIsLoaded(true);
    });
  }, [isLoaded]);

  {
    if (isLoaded) {
      return (
        <React.Fragment>
          <CssBaseline />
          <main>
            {console.log(productList.data)}
            <Container className={classes.cardGrid}>
              {/* End hero unit */}
              <Grid container spacing={4}>
                {productList.data.map(card => (
                  <Grid item key={card} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={card.FOOD_IMG}
                        title={card.PROD_NAME}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.PROD_NAME}
                        </Typography>
                        <Typography>{card.PROD_NETPR + "€"}</Typography>
                        <Typography>{card.CITY_NAME}</Typography>
                      </CardContent>
                      <CardActions
                        display="flex"
                        justifyContent="space-between"
                        flexDirection="row"
                        className={classes.cardActions}
                      >
                        <Button size="small" color="primary">
                          View
                        </Button>
                        <Button size="small" color="primary">
                          Add to cart
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </main>
        </React.Fragment>
      );
    } else {
      return (
        <Box display="flex" justifyContent="center" alignContent="center">
          <CircularProgress className={classes.progress} />
        </Box>
      );
    }
  }
};

export default Products;
