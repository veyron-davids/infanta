import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Loader from "./components/loader";
import MiddleNavNoUser from "./components/middleNavNoUser";
import MiddleNavUser from "./components/MiddleNavUser";
import Nav from "./components/nav";
import NavTop from "./components/navTop";
import Layout from "./layout/Layout";
import ErrorBoundary from "./mobile/pages/ErrorBoundary";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Placeholder from "./mobile/components/skeletons/placeholder"
import Help from "./pages/Help";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignOut from "./pages/SignOut";
import Wishlist from "./pages/Wishlist";
import auth from "./services/authService";
import ProtectedRoute from "./services/protectedRoute";
import { fetchUser } from "./store/auth-slice";
import { fetchCart, getProduct } from "./store/cart-slice";
import { selectOpenCookies } from "./store/mobile-slice";
import { fetchProducts, selectLoading } from "./store/product-slice";
import Footer from "./components/footer";

function App() {
  const currentUser = auth.getCurrentUser();
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
  }, []);

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
      {loading && <Placeholder />}
      <ErrorBoundary>
        <Switch>
          <Route path="/account/signin" component={Account} />
          <Route path="/account/signup" component={Account} />
          <div>
            {currentUser && <NavTop one="SIGN OUT" two="WISHLIST" />}
            {!currentUser && <NavTop />}
            {!currentUser && <Nav one="Login" two="Register" three="Help" />}
            {currentUser && <Nav one="Profile" three="Help" four="four" />}
            {opened && currentUser && <MiddleNavUser />}
            {opened && !currentUser && <MiddleNavNoUser />}
            <Layout>
              <ProtectedRoute path="/cart/summary" component={Cart} />
              <ProtectedRoute path="/cart/delivery-details" component={Cart} />
              <ProtectedRoute path="/cart/payment" component={Cart} />
              <ProtectedRoute path="/wishlist" component={Wishlist} />
              <Route path="/signout" component={SignOut} />
              <Route path="/help" component={Help} />
              <ProtectedRoute path="/profile/inbox" component={Profile} />
              <ProtectedRoute exact path="/profile" component={Profile} />
              <ProtectedRoute
                path="/profile/personal-details"
                component={Profile}
              />
              <ProtectedRoute
                path="/profile/address/display"
                component={Profile}
              />
              <ProtectedRoute path="/profile/address/new" component={Profile} />
              <ProtectedRoute
                path="/profile/address/edit"
                component={Profile}
              />
              <ProtectedRoute
                path="/profile/password-edit"
                component={Profile}
              />
              <ProtectedRoute path="/profile/orders/open" component={Profile} />
              <ProtectedRoute
                path="/profile/orders/closed"
                component={Profile}
              />
              <ProtectedRoute
                path="/profile/orders/details/:id"
                component={Profile}
              />
              <Route path="/home/girls-collections" component={Home} />
              <Route path="/home/boys-collections" component={Home} />
              <Route path="/home/ladies-collections" component={Home} />
              <Route path="/home/men-collections" component={Home} />
              <Route exact path="/" component={Home} />
            </Layout>
          </div>
        </Switch>
        <Footer/>
      </ErrorBoundary>
    </React.Fragment>
  );
}

export default App;

