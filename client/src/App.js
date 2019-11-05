import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";
import Nav from "./components"
import Jumbotron from "./components/Jumbotron";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
// import Form from "../components/Form";




function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Jumbotron />
        <Switch>
          <Route exact path="/" component={Books} />
          <Route exact path="/saved" component={Books} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;