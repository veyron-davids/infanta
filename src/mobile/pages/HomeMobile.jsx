import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import auth from "../../services/authService";
import {
  selectOpen,
  selectOpenCookies,
  toggleCookies,
} from "../../store/mobile-slice";
import { selectAllProducts, selectLoading } from "../../store/product-slice";
import AllProducts from "../components/allProducts";
import Carouse from "../components/carousel";
import Filter from "../components/filter";
import Footer from "../components/footer";
import FullOverlay from "../components/fullOverlay";
import NoUserNav from "../components/nav/noUserNav";
import UserNav from "../components/nav/userNav";
import PreCard from "../components/preCard";
import Random from "../components/random";
import home from "../css/home.module.css";

const HomeMobile = () => {
  const open = useSelector(selectOpen);
  const openCookies = useSelector(selectOpenCookies);
  const [opened, setOpened] = useState(false);
  const products = useSelector(selectAllProducts);

  const dispatch = useDispatch();

  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y <= -300) {
      setOpened(true);
    } else {
      setOpened(false);
    }
    //   console.log(currPos.x);
    //  console.log(currPos.y);
  });

  useEffect(() => {
    setTimeout(() => {
      dispatch(toggleCookies());
    }, 5000);
  }, []);

  return (
    <React.Fragment>
      {open && <FullOverlay />}
      <div className={home.container}>
        {!auth.getCurrentUser() && <NoUserNav />}
        {auth.getCurrentUser() && <UserNav />}
        <Carouse />
        <Random title="Top Picks For You">
          {products &&
            products
              .slice(0, 10)
              .map((item) => <PreCard key={item._id} product={item} />)}
        </Random>
        <Route exact path="/" component={AllProducts} />
        {opened && <Filter />}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default HomeMobile;
