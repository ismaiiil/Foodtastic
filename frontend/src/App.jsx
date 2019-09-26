import React from "react";
import "./App.css";
import SignIn from "./Pages/SignIn";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import Home from "./Pages/Home";
import Navbar from "./Pages/Components/Navbar";

function App() {
  const isLogged = useStoreState(state => state.user.isLogged);

  if (isLogged) {
    return (
      <Router>
        <div className="App">
          <Navbar></Navbar>
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  } else {
    return <SignIn></SignIn>;
  }
}

export default App;
