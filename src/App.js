import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import MiddleNavNoUser from "./components/middleNavNoUser";
import MiddleNavUser from "./components/MiddleNavUser";
import MiddleNav from "./components/MiddleNavUser";
import Nav from "./components/nav";
import NavTop from "./components/navTop";
import Layout from "./layout/Layout";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import SignOut from "./pages/SignOut";
import Wishlist from "./pages/Wishlist";
import auth from "./services/authService";
import { fetchUser } from "./store/auth-slice";
import { selectOpen } from "./store/product-slice";

function App() {
  const currentUser = useSelector((state) => state.auth);
  const [opened, setOpened] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    // dispatch(fetchProducts());
    if (currentUser) {
      auth.autoLogout();
    }
  }, []);

  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y <= -550) {
      setOpened(true);
    } else {
      setOpened(false);
    }
    console.log(currPos.x);
    console.log(currPos.y);
  });

  return (
    <Switch>
      <Route path="/account/signin" component={Account} />
      <Route path="/account/signup" component={Account} />
      <div>
        {auth.getCurrentUser() && <NavTop one="SIGN OUT" two="WISHLIST" />}
        {!auth.getCurrentUser() && <NavTop />}
        {!auth.getCurrentUser() && (
          <Nav one="Login" two="Register" three="Help" />
        )}
        {auth.getCurrentUser() && (
          <Nav one="Profile" two="Orders" three="Help" four="four" />
        )}
        {opened && auth.getCurrentUser() && <MiddleNavUser />}
        {opened && !auth.getCurrentUser() && <MiddleNavNoUser />}
        <Layout>
          {auth.getCurrentUser() ? (
            <Route path="/cart/summary" component={Cart} />
          ) : (
            <Redirect
              to={{
                pathname: "/account/signin",
                // state: { from: props.location },
              }}
            />
          )}
          {auth.getCurrentUser() ? (
            <Route path="/cart/delivery-details" component={Cart} />
          ) : (
            <Redirect
              to={{
                pathname: "/account/signin",
                // state: { from: props.location },
              }}
            />
          )}
          {auth.getCurrentUser() ? (
            <Route path="/cart/payment" component={Cart} />
          ) : (
            <Redirect
              to={{
                pathname: "/account/signin",
                // state: { from: props.location },
              }}
            />
          )}
          {auth.getCurrentUser() ? (
            <Route path="/profile" component={Profile} />
          ) : (
            <Redirect
              to={{
                pathname: "/account/signin",
                // state: { from: props.location },
              }}
            />
          )}
          {auth.getCurrentUser() ? (
            <Route path="/orders" component={Orders} />
          ) : (
            <Redirect
              to={{
                pathname: "/account/signin",
                // state: { from: props.location },
              }}
            />
          )}
          {auth.getCurrentUser() ? (
            <Route path="/wishlist" component={Wishlist} />
          ) : (
            <Redirect
              to={{
                pathname: "/account/signin",
                // state: { from: props.location },
              }}
            />
          )}
          <Route path="/signout" component={SignOut} />
          <Route path="/help" component={Help} />
          <Route path="/home/girls" component={Home} />
          <Route path="/home/collections" component={Home} />
          <Redirect from="/" exact to="/home/collections" />
        </Layout>
      </div>
    </Switch>
  );
}

export default App;
