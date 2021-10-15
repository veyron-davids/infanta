import React from "react";
import Footer from "../components/footer";
import NewAddressForm from "../components/newAddressForm";
import ProfileTitle from "../components/profileTitle";
import add from "../css/profile.module.css";

const NewMobileAddress = () => {
  return (
    <div className={add.address__container}>
      <div>
        <ProfileTitle
          locations="/profile/address/display"
          title="Add New Address"
        />
        <NewAddressForm />
      </div>
      <Footer />
    </div>
  );
};

export default NewMobileAddress;
