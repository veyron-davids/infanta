import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { selectAllProducts } from "../../store/product-slice";
import ClosedOrders from "../components/closedOrders";
import Footer from "../components/footer";
import OpenOrders from "../components/openOrders";
import PreCard from "../components/preCard";
import ProfileTitle from "../components/profileTitle";
import Random from "../components/random";
import TitleTab from "../components/titleTab";
import order from "../css/profile.module.css";

const OrdersMobile = () => {
  const products = useSelector(selectAllProducts);
  return (
    <div className={order.orders__container}>
      <div>
        <ProfileTitle locations="/profile" title="Orders" />
        <TitleTab
          locationsOne="/profile/orders/open"
          locationsTwo="/profile/orders/closed"
          titleOne="OPEN ORDERS"
          titletwo="CLOSED ORDERS"
        />
        <Route path="/profile/orders/open" component={OpenOrders} />
        <Route path="/profile/orders/closed" component={ClosedOrders} />
      </div>

      <div className={order.collections}>
        <Random title="Recommended For You">
          {products &&
            products
              .slice(0, 10)
              .map((item) => <PreCard key={item._id} product={item} />)}
        </Random>
      </div>
      <Footer />
    </div>
  );
};

export default OrdersMobile;
