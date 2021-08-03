import React from "react";
import { useSelector } from "react-redux";
import auth from "./authService";
import MiddleNavNoUser from "./middleNavNoUser";
import MiddleNavUser from "./middleNavUser";
import {isAuth} from "../store/auth-slice"

const MiddleNav = () => {
  const currentUser = useSelector(isAuth);
  return (
    <React.Fragment>
      {currentUser ? <MiddleNavNoUser /> : <MiddleNavUser />}
    </React.Fragment>
  );
};

export default MiddleNav;
