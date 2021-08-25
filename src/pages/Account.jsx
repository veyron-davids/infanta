import React, { useEffect } from "react";
import Particles from "react-particles-js";
import { NavLink, Route } from "react-router-dom";
import Signin from "../components/Signin";
import SignUp from "../components/SignUp";
import account from "../css/account.module.css";
import SignIn from "../mobile/pages/SignIn";
import Signup from "../mobile/pages/Signup";
import particlesOptions from "../particlesjs-config";
import auth from "../services/authService";

const Account = () => {
  useEffect(() => {
    auth.logout();
  }, []);
  return (
    <React.Fragment>
      <div className={account.container}>
        <div className={account.container__one}>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <div className={account.logo}>
              <span id={account.span}>Infanta</span>
              <div id={account.caption}>...quality & price at it's best</div>
            </div>
          </NavLink>
          <Particles className={account.particles} params={particlesOptions} />
        </div>
        <Route path="/account/signin" component={Signin} />
        <Route path="/account/signup" component={SignUp} />
      </div>
      <Route path="/account/signin" component={SignIn} />
      <Route path="/account/signup" component={Signup} />
    </React.Fragment>
  );
};

export default Account;
