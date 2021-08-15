import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import details from "../css/profile.module.css";

const OrderDetails = () => {
  return (
    <div className={details.container__two}>
      <div className={details.address__content}>
        <div className={details.order__title}>
          <NavLink
            to="/profile/orders/open"
            id={details.back__icon}
            style={{ textDecoration: "none" }}
          >
            <IoIosArrowRoundBack />
          </NavLink>
        </div>
        <div className={details.order__details}>
          <span>Order nº 395478299</span> <br />
          <span>1 Items</span>
          <span>Placed on 20-03-2019</span>
          <span>Total: ₦ 57,050</span>
        </div>
        <div className={details.other__details}>
          <div className={details.payment__details}>
            <div className={details.other__title}>PAYMENT INFORMATION</div>
            <div className={details.rest__details}>
              <div className={details.rest__details__one}>
                <span>Payment Method</span>
                <span>Others</span>
              </div>
              <div className={details.rest__details__two}>
                <span>Payment Details</span>
                <span>Items total: ₦ 54,000</span>
                <span>Shipping Fees: ₦ 3,050</span>
                <span>Total: ₦ 57,050</span>
              </div>
            </div>
          </div>
          <div className={details.address__details}>
            <div className={details.other__title}>DELIVERY INFORMATION</div>
            <div className={details.rest__details}>
              <div className={details.rest__details__one}>
                <span>Delivery Method</span>
                <span>Standard Door Delivery</span>
              </div>
              <div className={details.rest__details__two}>
                <span>Shipping Address</span>
                <span>Abiola Ajileye</span>
                <span>GNI Building Alagbaka Akure</span>
                <span>ALAGBAKA, Ondo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
