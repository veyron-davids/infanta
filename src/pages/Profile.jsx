import React from "react";
import { Route } from "react-router-dom";
import Address from "../components/address";
import Details from "../components/details";
import Inbox from "../components/inbox";
import Password from "../components/password";
import Preferences from "../components/preferences";
import Side from "../components/side";
import profile from "../css/profile.module.css";

const Profile = () => {
  const side = {
    one: {
      label: "Inbox",
      route: "/profile/inbox",
    },
    two: {
      label: "Details",
      route: "/profile/personal-details",
    },
    three: {
      label: "Address Book",
      route: "/profile/address",
    },
    four: {
      label: "Change Password",
      route: "/profile/password-edit",
    },
    five: {
      label: "Newsletters",
      route: "/profile/newsletter-preferences",
    },
  };

  return (
    <div className={profile.container}>
      <Side data={side} />
      <Route path="/profile/inbox" component={Inbox} />
      <Route path="/profile/personal-details" component={Details} />
      <Route path="/profile/address" component={Address} />
      <Route path="/profile/password-edit" component={Password} />
      <Route path="/profile/newsletter-preferences" component={Preferences} />
    </div>
  );
};

export default Profile;
