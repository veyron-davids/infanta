import React from "react";
import { useSelector } from "react-redux";
import prod from "../css/productCont.module.css";
import { selectAllProducts } from "../store/product-slice";
import Card from "./card";

const CatFour = () => {
  const products = useSelector(selectAllProducts);

  return (
    <div className={prod.container__two}>
      {products &&
        products.map((item) => <Card key={item._id} product={item} />)}
    </div>
  );
};

export default CatFour;
