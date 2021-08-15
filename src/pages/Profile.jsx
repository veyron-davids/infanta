import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import HorizontalScroll from "react-scroll-horizontal";
import Address from "../components/address";
import Details from "../components/details";
import Inbox from "../components/inbox";
import Orders from "../components/orders";
import Password from "../components/password";
import CardTwo from "../components/cardTwo";
import Side from "../components/side";
import NewAddress from "../components/newAddress";
import EditAddress from "../components/editAddress";
import profile from "../css/profile.module.css";
import { selectAllProducts } from "../store/product-slice";
import OrderDetails from "../components/orderDetails";
import InboxMobile from "../mobile/pages/Inbox";
import ProfileMobile from "../mobile/pages/ProfileMobile";
import OrdersMobile from "../mobile/pages/Orders";

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
          <Route path="/profile/inbox" component={Inbox} />
          <Route path="/profile/orders/open" component={Orders} />
          <Route path="/profile/orders/closed" component={Orders} />
          <Route path="/profile/orders/details/:id" component={OrderDetails} />
          <Route path="/profile/personal-details" component={Details} />
          <Route path="/profile/address/display" component={Address} />
          <Route path="/profile/address/new" component={Address} />
          <Route path="/profile/address/edit" component={Address} />
          <Route path="/profile/password-edit" component={Password} />
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
      <Route path="/profile/inbox" component={InboxMobile} />
      <Route path="/profile/orders/open" component={OrdersMobile} />
      <Route exact path="/profile" component={ProfileMobile} />
    </React.Fragment>
  );
};

export default Profile;
