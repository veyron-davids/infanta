import React from "react";
import { NavLink, Route } from "react-router-dom";
import orders from "../css/profile.module.css";
import ProtectedRoute from "../services/protectedRoute";
import ClosedOrders from "./closedOrders";
import OpenOrders from "./openOrders";

const Orders = () => {
  return (
    <div className={orders.container__two}>
      <div className={orders.orders__content}>
        <div className={orders.order__title}>
          <NavLink
            to="/profile/orders/open"
            className={orders.myspan}
            activeClassName={orders.active}
            style={{ textDecoration: "none" }}
          >
            <span>Open Orders</span>
          </NavLink>
          <NavLink
            to="/profile/orders/closed"
            className={orders.myspan}
            activeClassName={orders.active}
            style={{ textDecoration: "none" }}
          >
            <span>Closed Orders</span>
          </NavLink>
        </div>
        <ProtectedRoute path="/profile/orders/open" component={OpenOrders} />
        <ProtectedRoute
          path="/profile/orders/closed"
          component={ClosedOrders}
        />
      </div>
    </div>
  );
};

export default Orders;
