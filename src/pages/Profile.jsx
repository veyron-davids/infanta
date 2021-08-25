import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import HorizontalScroll from "react-scroll-horizontal";
import Address from "../components/address";
import CardTwo from "../components/cardTwo";
import Details from "../components/details";
import Inbox from "../components/inbox";
import OrderDetails from "../components/orderDetails";
import Orders from "../components/orders";
import Password from "../components/password";
import Side from "../components/side";
import profile from "../css/profile.module.css";
import DetailsMobile from "../mobile/pages/Details";
import InboxMobile from "../mobile/pages/Inbox";
import OrdersMobile from "../mobile/pages/Orders";
import ProfileMobile from "../mobile/pages/ProfileMobile";
import ProtectedRoute from "../services/protectedRoute";
import { selectAllProducts } from "../store/product-slice";

const Profile = () => {
  const products = useSelector(selectAllProducts);
  const side = {
    one: {
      label: "Inbox",
      route: "/profile/inbox",
    },
    two: {
      label: "Orders",
      route: "/profile/orders/open",
    },
    three: {
      label: "Details",
      route: "/profile/personal-details",
    },
    four: {
      label: "Address Book",
      route: "/profile/address/display",
    },
    five: {
      label: "Change Password",
      route: "/profile/password-edit",
    },
  };

  return (
    <React.Fragment>
      <div className={profile.container}>
        <div className={profile.container__inside}>
          <Side data={side} />
          <ProtectedRoute path="/profile/inbox" component={Inbox} />
          <ProtectedRoute path="/profile/orders/open" component={Orders} />
          <ProtectedRoute path="/profile/orders/closed" component={Orders} />
          <ProtectedRoute
            path="/profile/orders/details/:id"
            component={OrderDetails}
          />
          <ProtectedRoute
            path="/profile/personal-details"
            component={Details}
          />
          <ProtectedRoute path="/profile/address/display" component={Address} />
          <ProtectedRoute path="/profile/address/new" component={Address} />
          <ProtectedRoute path="/profile/address/edit" component={Address} />
          <ProtectedRoute path="/profile/password-edit" component={Password} />
        </div>

        <div className={profile.recently__viewed}>
          <div className={profile.recently__titled}>Recently Viewed</div>
          <div className={profile.recently__viewed__scroll}>
            <HorizontalScroll>
              {products.map((item, i) => (
                <CardTwo key={i} product={item} />
              ))}
            </HorizontalScroll>
          </div>
        </div>
      </div>
      <ProtectedRoute path="/profile/inbox" component={InboxMobile} />
      <ProtectedRoute path="/profile/orders/open" component={OrdersMobile} />
      <ProtectedRoute path="/profile/orders/closed" component={OrdersMobile} />
      <ProtectedRoute
        path="/profile/personal-details"
        component={DetailsMobile}
      />
      <ProtectedRoute exact path="/profile" component={ProfileMobile} />
    </React.Fragment>
  );
};

export default Profile;
