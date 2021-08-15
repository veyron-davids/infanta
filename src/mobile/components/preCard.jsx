import React from "react";
import pre from "../../mobile/css/home.module.css";

const PreCard = () => {
  return (
    <div className={pre.container__card}>
      <div className={pre.container__card__img}>
        <img
          src="https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1057506940?k=6&m=1057506940&s=612x612&w=0&h=C11yA-ESqeuCX63QkRpPyWmAMXJJvZw0niQluGnATlI="
          alt=""
        />
      </div>
      <div className={pre.container__card__details}>
        <span> Best clothes</span>
        <br />
        <span>₦2,000</span>
      </div>
    </div>
  );
};

export default PreCard;
