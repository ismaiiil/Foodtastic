import React from "react";
import "./App.css";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import Home from "./Pages/Home";
import Navbar from "./Pages/Components/Navbar";

function App() {
  const isLogged = useStoreState(state => state.user.isLogged);

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
          </Switch>
        </Navbar>
      </div>
    </Router>
  );
}

export default App;
