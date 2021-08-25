import React from "react";
import card from "../../mobile/css/products.module.css";

const Buttons = ({children, style, onClick, disabled, id}) => {
    return (
      <button
        disabled={disabled}
        className={style ? style : card.container__card__button}
        onClick={onClick}
        id={id}
      >
        {children}
      </button>
    );
};

export default Buttons;
