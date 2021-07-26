import React from "react";
import prod from "../css/productCont.module.css";

const Paginate = () => {
  return (
    <div className={prod.pagination}>
      <div className={prod.pagination__prev}>
        <span id={prod.icon}>&lt</span>
      </div>
      <div className={prod.pagination__next}>
        <span id={prod.icon}>&gt</span>
      </div>
    </div>
  );
};

export default Paginate;
