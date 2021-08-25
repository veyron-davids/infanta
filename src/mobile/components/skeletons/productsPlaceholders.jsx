import React from "react";
import Skeleton from "react-loading-skeleton";
import "../../css/skeleton.css";
import CardPlaceholder from "./cardPlaceholder";

const ProductsPlaceholders = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div className="container">
      <div className="title__prod">
        <Skeleton />
      </div>
      <div className="container__content">
        {arr.map((item) => (
          <CardPlaceholder key={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPlaceholders;
