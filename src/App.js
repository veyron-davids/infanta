import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Loader from "./components/loader";
import MiddleNavNoUser from "./components/middleNavNoUser";
import MiddleNavUser from "./components/MiddleNavUser";
import Nav from "./components/nav";
import NavTop from "./components/navTop";
import Layout from "./layout/Layout";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignOut from "./pages/SignOut";
import Wishlist from "./pages/Wishlist";
import auth from "./services/authService";
import { fetchUser, isAuth } from "./store/auth-slice";
import { fetchCart, getProduct } from "./store/cart-slice";
import { selectOpenCookies } from "./store/mobile-slice";
import { fetchProducts, selectLoading } from "./store/product-slice";

function App() {
  const currentUser = useSelector(isAuth);
  const openCookies = useSelector(selectOpenCookies);
  const loading = useSelector(selectLoading);
  const [opened, setOpened] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(getProduct());
    dispatch(fetchCart());
    dispatch(fetchProducts());
    if (currentUser) {
      auth.autoLogout();
    }
  }, [dispatch]);

  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y <= -550) {
      setOpened(true);
    } else {
      setOpened(false);
    }
    //   console.log(currPos.x);
    //  console.log(currPos.y);
  });

  return (
    <React.Fragment>
      {/* {openCookies && <CookiesAlert />} */}
      {loading && <Loader />}
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
            <Nav one="Profile" three="Help" four="four" />
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
            <Route path="/profile/inbox" component={Profile} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/profile/personal-details" component={Profile} />
            <Route path="/profile/address/display" component={Profile} />
            <Route path="/profile/address/new" component={Profile} />
            <Route path="/profile/address/edit" component={Profile} />
            <Route path="/profile/password-edit" component={Profile} />
            <Route path="/profile/orders/open" component={Profile} />
            <Route path="/profile/orders/closed" component={Profile} />
            <Route path="/profile/orders/details/:id" component={Profile} />
            <Route path="/home/girls-collections" component={Home} />
            <Route path="/home/boys-collections" component={Home} />
            <Route path="/home/ladies-collections" component={Home} />
            <Route path="/home/men-collections" component={Home} />
            <Route path="/home/collections" component={Home} />
            <Redirect from="/" exact to="/home/collections" />
          </Layout>
        </div>
      </Switch>
    </React.Fragment>
  );
}

export default App;
