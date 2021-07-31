import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarouselComponent from "../components/CarouselComponent";
import Overlay from "../components/overlay";
import Paginate from "../components/paginate";
import ProductCont from "../components/productCont";
import auth from "../services/authService";
import {
  selectOpen,
} from "../store/cart-slice";
import { fetchProducts } from "../store/product-slice";


const Home = () => {

  const open = useSelector(selectOpen);
  const dispatch = useDispatch();

 

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
