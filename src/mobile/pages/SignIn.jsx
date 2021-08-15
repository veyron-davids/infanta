import React from "react";
import sign from "../../mobile/css/account.module.css";
import NoUserNav from "../components/nav/noUserNav";
import SignInForm from "../components/signInForm";
import TitleTab from "../components/titleTab";

const SignIn = () => {
  return (
    <div className={sign.signIn}>
      <NoUserNav />
      <TitleTab
        locationsOne="/account/signin"
        titleOne="LOGIN"
        locationsTwo="/account/signup"
        titletwo="CREATE ACCOUNT"
      />
      <SignInForm />
    </div>
  );
};

export default SignIn;
