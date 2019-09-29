import React from "react";
import "./App.css";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import Home from "./Pages/Home";
import Navbar from "./Pages/Components/Navbar";
import ManageUsers from "./Pages/Admin/Users";
import ManageProducts from "./Pages/Admin/Products";
import Cart from "./Pages/Cart/cart";

function App() {
  const isLogged = useStoreState(state => state.user.isLogged);
  const user = useStoreState(state => state.user.user);
  console.log(user);
  return (
    <Router>
      <div className="App">
        <Navbar>
          <Switch>
            <Route exact path="/" component={Home} />
            {isLogged ? null : (
              <Route path="/signin" component={SignIn}></Route>
            )}

            <Route path="/signup" component={SignUp}></Route>
            {console.log(user.isAdmin + "icic sa")}
            {user.isAdmin == 1 ? (
              <React.Fragment>
                <Route path="/manageusers" component={ManageUsers}></Route>
                <Route
                  path="/manageproducts"
                  component={ManageProducts}
                ></Route>
              </React.Fragment>
            ) : null}

            <Route path="/cart" component={Cart}></Route>
          </Switch>
        </Navbar>
      </div>
    </Router>
  );
}

export default App;
