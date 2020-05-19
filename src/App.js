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
import { AuthContextProvider, PrivateRoute } from "./components/Login/UseAuth";
import Footer from "./components/Footer/Footer";
import OurService from "./components/OurServices/OurServices";
import Shipment from "./components/Shipment/Shipment";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Banner></Banner>
              <Food />
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
            <Route path="/cart">
              <Cart />
            </Route>
            <PrivateRoute path="/shipment">
              <Shipment></Shipment>
            </PrivateRoute>
          </Switch>
        </Router>
        <OurService></OurService>
      </AuthContextProvider>
      <Footer></Footer>
    </div>
  );
}

export default App;
