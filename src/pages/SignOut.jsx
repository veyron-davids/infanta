import auth from "../services/authService";
import { useHistory } from "react-router-dom";

const SignOut = () => {

  const logout = () => {
    auth.logout();
    window.location = "/home/collections";
  };
  logout();
};

export default SignOut;
