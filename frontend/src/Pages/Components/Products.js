import React, { useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Box, CircularProgress } from "@material-ui/core";
import { useStoreActions } from "easy-peasy";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  tabs: {
    padding: theme.spacing(3)
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

const Products = props => {
  const classes = useStyles();
  const [productList, setProductList] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [url, setUrl] = React.useState(
    "http://10.0.0.10/?resources=products&action=all"
  );
  const [card, setCard] = React.useState(null);
  const setCartItems = useStoreActions(actions => actions.cart.setCartItems);
  const handleView = card => {
    setCard(card);
    console.log(card);
    props.history.push({
      pathname: "/viewProduct",
      state: card
    });
  };
  const handleAddToCart = card => {
    setCartItems(card);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
    switch (newValue) {
      case 0:
        setUrl("http://10.0.0.10/?resources=products&action=all");
        break;
      case 1:
        setUrl("http://10.0.0.10/?resources=products&action=search&city=Paris");
        break;
      case 2:
        setUrl(
          "http://10.0.0.10/?resources=products&action=search&city=Marseille"
        );
        break;
      case 3:
        setUrl(
          "http://10.0.0.10/?resources=products&action=search&city=Montreal"
        );
        break;
      case 4:
        setUrl(
          "http://10.0.0.10/?resources=products&action=search&city=Berlin"
        );
        break;
      case 5:
        setUrl("http://10.0.0.10/?resources=products&action=search&city=Rome");
        break;
      default:
        setUrl("http://10.0.0.10/?resources=products&action=all");
        break;
    }
  };
  useEffect(() => {
    axios.get(url).then(res => {
      let data = res.data;
      setProductList(data);
      setIsLoaded(true);
    });
  }, [isLoaded, value]);

  if (productList === undefined || productList === null) {
    return (
      <Box display="flex" justifyContent="center" alignContent="center">
        <CircularProgress className={classes.progress} />
      </Box>
    );
  } else if (isLoaded) {
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          <Paper>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="All" />
              <Tab label="Paris" />
              <Tab label="Marseille" />
              <Tab label="Montreal" />
              <Tab label="Berlin" />
              <Tab label="Rome" />
            </Tabs>
          </Paper>
          <Container className={classes.cardGrid}>
            {/* End hero unit */}

            <Grid container spacing={4}>
              {productList.data.map(card => (
                <Grid item key={card.PROD_ID} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={card.FOOD_IMG}
                      alt={card.PROD_NAME}
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
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleView(card)}
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleAddToCart(card)}
                      >
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
};

export default withRouter(Products);
