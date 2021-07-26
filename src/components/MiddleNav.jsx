import React from "react";
import { useSelector } from "react-redux";
import auth from "./authService";
import MiddleNavNoUser from "./middleNavNoUser";
import MiddleNavUser from "./middleNavUser";

const MiddleNav = () => {
  const currentUser = useSelector((state) => state.auth);
  return (
    <React.Fragment>
      {auth.getCurrentUser() ? <MiddleNavNoUser /> : <MiddleNavUser />}
    </React.Fragment>
  );
};

export default MiddleNav;
