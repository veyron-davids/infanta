import React from "react";
import Particles from "react-particles-js";
import { NavLink, Route } from "react-router-dom";
import Signin from "../components/Signin";
import SignUp from "../components/SignUp";
import account from "../css/account.module.css";
import particlesOptions from "../particlesjs-config";

const Account = () => {
  return (
    <div className={account.container}>
      <div className={account.container__one}>
        <NavLink to="/home/collections" style={{ textDecoration: "none" }}>
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
  );
};

export default Account;
