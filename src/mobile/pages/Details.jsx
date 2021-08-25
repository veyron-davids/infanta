import React from "react";
import DetailsForm from "../components/detailsForm";
import Footer from "../components/footer";
import ProfileTitle from "../components/profileTitle";
import detail from "../css/profile.module.css";

const DetailsMobile = () => {
  return (
    <div className={detail.detail__container}>
      <div>
        <ProfileTitle locations="/profile" title="Edit Personal Information" />
        <DetailsForm />
      </div>
      <Footer />
    </div>
  );
};

export default DetailsMobile;
