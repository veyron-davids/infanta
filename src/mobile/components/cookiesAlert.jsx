import React from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import cook from "../../mobile/css/products.module.css";
import { toggleCookies } from "../../store/mobile-slice";

const CookiesAlert = () => {
  const dispatch = useDispatch();
  return (
    <div className={cook.container__cookies}>
      <span>
        This website uses cookies. Inorder to give you the best browsing
        experience and offline support, we store some information in your
        browser memory.
      </span>
      <span>
        <IoIosCheckmarkCircleOutline
          onClick={() => {
            dispatch(toggleCookies());
          }}
        />
      </span>
    </div>
  );
};

export default CookiesAlert;
