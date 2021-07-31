import React from "react";
import { Route } from "react-router-dom";
import prod from "../css/productCont.module.css";
import AllProducts from "./allProducts";
import CatFive from "./catFive";
import CatFour from "./catFour";
import CatThree from "./catThree";
import CatTwo from "./catTwo";
import Side from "./side";

const ProductCont = () => {
  const side = {
    one: {
      label: "All Collections",
      route: "/home/collections",
    },
    two: {
      label: "Stylish Girls",
      route: "/home/girls-collections",
    },
    three: {
      label: "Cool Boys",
      route: "/home/boys-collections",
    },
    four: {
      label: "Vogue Ladies",
      route: "/home/ladies-collections",
    },
    five: {
      label: "Solid Men",
      route: "/home/men-collections",
    },
  };

  return (
    <div className={prod.container}>
      <Side data={side} />
      <Route path="/home/girls-collections" component={CatTwo} />
      <Route path="/home/boys-collections" component={CatThree} />
      <Route path="/home/ladies-collections" component={CatFour} />
      <Route path="/home/men-collections" component={CatFive} />
      <Route path="/home/collections" component={AllProducts} />
      {/* <Redirect  exact to="/collections" /> */}
    </div>
  );
};

export default ProductCont;
