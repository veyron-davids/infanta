import React from "react";
import Footer from "../components/footer";
import ProfileTitle from "../components/profileTitle";
import OrderCard from "../components/orderCard";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../store/product-slice";
import TitleTab from "../components/titleTab";
import order from "../css/profile.module.css";
import Random from "../components/random";
import PreCard from "../components/preCard";

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
        <OrderCard />
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
