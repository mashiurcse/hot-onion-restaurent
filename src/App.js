import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Cart from "./components/Cart/Cart";
import Food from "./components/Food/Food";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ItemDetails from "./components/ItemDetails/ItemDetails";

function App() {
  return (
    <div>
      <Header />

      <Router>
        <Switch>
          <Route exact path="/">
            <Banner></Banner>
            <Food />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/product/:id">
            <ItemDetails></ItemDetails>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
