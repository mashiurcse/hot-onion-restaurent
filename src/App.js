import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Cart from "./components/Cart/Cart";
import Food from "./components/Food/Food";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ItemDetails from "./components/ItemDetails/ItemDetails";
import OrderPlace from "./components/OrderPlace/OrderPlace";
import Login from "./components/Login/Login";
import { AuthContextProvider } from "./components/Login/UseAuth";

function App() {
  return (
    <div>
      <AuthContextProvider>
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
            <Route exact path="/login">
              <Login></Login>
            </Route>
            <Route path="/orderPlaced">
              <OrderPlace></OrderPlace>
            </Route>
            <Route path="/product/:id">
              <ItemDetails></ItemDetails>
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
