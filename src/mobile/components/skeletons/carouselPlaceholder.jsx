import React from "react";
import Skeleton from "react-loading-skeleton";
import "../../css/skeleton.css";

const CarouselPlaceholder = () => {
  return (
    <div className="carouse">
      <Skeleton duration={2} className="inner" />;
    </div>
  ); 
};

export default CarouselPlaceholder;
