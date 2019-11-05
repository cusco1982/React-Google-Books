import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";




function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Books} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/books/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
