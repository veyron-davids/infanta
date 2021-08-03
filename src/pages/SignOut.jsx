import { useDispatch } from "react-redux";
import auth from "../services/authService";
import { logUserOut } from "../store/auth-slice";

const SignOut = () => {
  const dispatch = useDispatch();
  const logout = () => {
    // dispatch(logUserOut());
    auth.logout();
    window.location = "/home/collections";
  };
  logout();
};

export default SignOut;
