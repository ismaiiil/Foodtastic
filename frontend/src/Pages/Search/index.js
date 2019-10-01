import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useStoreState } from "easy-peasy";
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
const SearchResults = () => {
  const searchList = useStoreState(state => state.user.searchList);
  const classes = useStyles();

  {
    if (searchList.data.length !== 0) {
      return (
        <React.Fragment>
          <CssBaseline />
          <main>
            <Box display="flex" justifyContent="center">
              <Typography variant="h4">Search Results</Typography>
            </Box>
            <Container className={classes.cardGrid}>
              {/* End hero unit */}
              <Grid container spacing={4}>
                {searchList.data.map(card => (
                  <Grid item key={card} xs={12} sm={6} md={4}>
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
        <Box display="flex" justifyContent="center">
          <Typography variant="h4">No Results Found</Typography>
        </Box>
      );
    }
  }
};

export default SearchResults;
