import React from "react";
import Skeleton from "react-loading-skeleton";
import "../../css/skeleton.css";

const CardPlaceholder = () => {
  return (
    <div className="container__list">
      <Skeleton height="10rem" width="10.6rem" />
      <div className="insider">
        <Skeleton width="7.6rem" />
        <Skeleton width="3.6rem" />
      </div>
    </div>
  );
};

export default CardPlaceholder;
