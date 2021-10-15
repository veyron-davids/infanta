import React from "react";
import Skeleton from "react-loading-skeleton";
import "../../css/skeleton.css";

const CarouselPlaceholder = () => {
  return (
    <div className="carouse__cont">
      <Skeleton duration={2} className="carou"/>
    </div>
  );
};

export default CarouselPlaceholder;
