import React from "react";
import "./App.css";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import Home from "./Pages/Home";
import Navbar from "./Pages/Components/Navbar";
import ManageUsers from "./Pages/Admin/Users";
import ManageProducts from "./Pages/Admin/Products";
import Cart from "./Pages/Cart/cart";
import Profile from "./Pages/User/Profile";
import SearchResults from "./Pages/Search";
import NotFoundPage from "./Pages/Errors/NotFound";

function App() {
  const isLogged = useStoreState(state => state.user.isLogged);
  const user = useStoreState(state => state.user.user);
  return (
    <Router>
      <div className="App">
        <Navbar>
          <Switch>
            <Route exact path="/" component={Home} />
            {isLogged ? null : (
              <Route path="/signin" component={SignIn}></Route>
            )}
            <Route path="/profile" component={Profile}></Route>
            <Route path="/searchresults" component={SearchResults}></Route>
            <Route
              path="/cart"
              exact
              render={props => <Cart {...props} displayTitle={true} />}
            />

            <Route path="/signup" component={SignUp}></Route>
            {user.isAdmin === "1" ? (
              <React.Fragment>
                <Route path="/manageusers" component={ManageUsers}></Route>
                <Route
                  path="/manageproducts"
                  component={ManageProducts}
                ></Route>
              </React.Fragment>
            ) : null}
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Navbar>
      </div>
    </Router>
  );
}

export default App;
