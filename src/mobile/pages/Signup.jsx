import React from "react";
import sign from "../../mobile/css/account.module.css";
import TitleTab from "../components/titleTab";
import NoUserNav from "../components/nav/noUserNav";
import SignUpForm from "../components/signUpForm";

const Signup = () => {
  return (
    <div className={sign.signUp}>
      <NoUserNav />
      <TitleTab
        locationsOne="/account/signin"
        titleOne="LOGIN"
        locationsTwo="/account/signup"
        titletwo="CREATE ACCOUNT"
      />
      <SignUpForm />
    </div>
  );
};

export default Signup;
