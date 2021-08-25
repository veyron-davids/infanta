import React from "react";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import over from "../css/bottomDrawer.module.css";

const DrawerItem = ({
  price,
  dispatchAdd,
  loading,
  dispatchMinus,
  prefix,
  size,
  style,
}) => {
  return (
    <div className={over.overlay__list}>
      <div className={over.overlay__list__desc}>
        <span>{prefix}</span>
        <span>{price}</span>
      </div>
      <div className={over.overlay__list__icons}>
        <AiFillMinusSquare
          className={over.shadow}
          onClick={dispatchMinus}
          id={style}
        />
        {loading ? <div className={over.ring}></div> : <span>{size}</span>}
        <AiFillPlusSquare className={over.shadow} onClick={dispatchAdd} />
      </div>
    </div>
  );
};

export default DrawerItem;
