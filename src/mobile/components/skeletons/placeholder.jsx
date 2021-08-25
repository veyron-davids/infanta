import React from "react";
import auth from "../../../services/authService";
import Filter from "../../components/filter";
import Footer from "../../components/footer";
import NoUserNav from "../../components/nav/noUserNav";
import UserNav from "../../components/nav/userNav";
import CarouselPlaceholder from "./carouselPlaceholder";
import ProductsPlaceholders from "./productsPlaceholders";
import RandomPlaceholders from "./randomPlaceholders";
import home from "../../css/home.module.css";

const Placeholder = () => {
  return (
    <React.Fragment>
      <div className={home.container}>
        {!auth.getCurrentUser() && <NoUserNav />}
        {auth.getCurrentUser() && <UserNav />}
        <CarouselPlaceholder />
        <RandomPlaceholders />
        <ProductsPlaceholders />
        <Filter />
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Placeholder;
