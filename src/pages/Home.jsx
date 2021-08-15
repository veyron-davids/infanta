import React from "react";
import { useSelector } from "react-redux";
import CarouselComponent from "../components/CarouselComponent";
import Overlay from "../components/overlay";
import ProductCont from "../components/productCont";
import NoUserNav from "../mobile/components/nav/noUserNav";
import HomeMobile from "../mobile/pages/HomeMobile";
import { isAuth } from "../store/auth-slice";
import { selectOpen } from "../store/cart-slice";

const Home = () => {
  const currentUser = useSelector(isAuth);
  const open = useSelector(selectOpen);

  return (
    <React.Fragment>
      <div>
        {open && currentUser && <Overlay />}
        <CarouselComponent />
        <ProductCont />
      </div>
      <HomeMobile />
    </React.Fragment>
  );
};

export default Home;
