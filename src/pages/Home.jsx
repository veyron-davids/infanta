import React from "react";
import { useSelector } from "react-redux";
import CarouselComponent from "../components/CarouselComponent";
import Overlay from "../components/overlay";
import ProductCont from "../components/productCont";
import HomeMobile from "../mobile/pages/HomeMobile";
import auth from "../services/authService";
import { selectOpen } from "../store/cart-slice";
import {  selectLoading } from "../store/product-slice";

const Home = () => {
  const currentUser = auth.getCurrentUser();
  const open = useSelector(selectOpen);
    const loading = useSelector(selectLoading);

  return (
    <React.Fragment>
      <div>
        {open && currentUser && <Overlay />}
        <CarouselComponent />
        <ProductCont />
      </div>
      {!loading && <HomeMobile />}
    </React.Fragment>
  );
};

export default Home;
