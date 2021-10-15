import React from "react";
import Footer from "../components/footer";
import ProfileTitle from "../components/profileTitle";
import add from "../css/profile.module.css";
import EditAddressForm from "../components/editAddressForm";

const EditAddress = () => {
  return (
    <div className={add.address__container}>
      <div>
        <ProfileTitle
          locations="/profile/address/display"
          title="Edit Address"
        />
        <EditAddressForm/>
      </div>
      <Footer />
    </div>
  );
};

export default EditAddress;
