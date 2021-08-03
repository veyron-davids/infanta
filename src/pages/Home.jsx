import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarouselComponent from "../components/CarouselComponent";
import Overlay from "../components/overlay";
import Paginate from "../components/paginate";
import ProductCont from "../components/productCont";
import { isAuth, selectUser } from "../store/auth-slice";
import { selectOpen } from "../store/cart-slice";

const Home = () => {
  const currentUser = useSelector(isAuth);
  const user = useSelector(selectUser);
  const open = useSelector(selectOpen);
  const dispatch = useDispatch();

  const refresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    // refresh();
    console.log("ran");
  }, [open]);

  return (
    <div>
      {open && currentUser && <Overlay />}
      <CarouselComponent />
      <ProductCont />
      <Paginate />
    </div>
  );
};

export default Home;
