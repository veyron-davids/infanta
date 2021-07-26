import React from "react";
import { Route } from "react-router-dom";
import prod from "../css/productCont.module.css";
import AllProducts from "./allProducts";
import CatTwo from "./catTwo";
import Side from "./side";

const ProductCont = () => {
  return (
    <div className={prod.container}>
      <Side />
        <Route path="/home/girls" component={CatTwo} />
        <Route path="/home/collections" component={AllProducts} />
        {/* <Redirect  exact to="/collections" /> */}
    </div>
  );
};

export default ProductCont;
