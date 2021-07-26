import React from "react";
import CarouselComponent from "../components/CarouselComponent";
import Paginate from "../components/paginate";
import { useDispatch, useSelector } from "react-redux";
import { selectOpen } from "../store/product-slice";
import ProductCont from "../components/productCont";
import auth from "../services/authService";
import Overlay from "../components/overlay";

const Home = () => {
  const open = useSelector(selectOpen);

  return (
    <div>
      {open && auth.getCurrentUser() && <Overlay />}
      <CarouselComponent />
      <ProductCont />
      <Paginate />
    </div>
  );
};

export default Home;
