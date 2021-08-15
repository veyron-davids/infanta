import React from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../store/product-slice";
import OrderCard from "./orderCard";

const OpenOrders = () => {
  const products = useSelector(selectAllProducts);
  return (
    <React.Fragment>
      <OrderCard />
    </React.Fragment>
  );
};

export default OpenOrders;
