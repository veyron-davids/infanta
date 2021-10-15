import React from "react";
import Skeleton from "react-loading-skeleton";
import "../../css/skeleton.css";

const RandomPlaceholders = () => {
  return (
    <div className="picks">
      <div className="title__prod">
        <Skeleton />
      </div>
      <div className="picks__cards">
        <div className="container__list">
          <Skeleton className="picture" />
          {/* <div className="insider">
            <Skeleton width="7.6rem" />
            <Skeleton width="3.6rem" />
          </div> */}
        </div>
        <div className="container__list">
          <Skeleton className="picture" />
          {/* <div className="insider">
            <Skeleton width="7.6rem" />
            <Skeleton width="3.6rem" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RandomPlaceholders;
