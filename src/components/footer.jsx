import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import foot from "../css/footer.module.css";

const Footer = () => {
  const [adjust, setAdjust] = useState(false);
  const route = useLocation();

  useEffect(() => {
    if (
      route.pathname === "/account/signup" ||
      route.pathname === "/account/signin"
    ) {
      setAdjust(true);
    } else {
      setAdjust(false);
    }
  }, []);

  return (
    <div className={foot.footer} id={adjust && foot.merge}>
      <span>© Infanta Global Wears</span>
    </div>
  );
};

export default Footer;
