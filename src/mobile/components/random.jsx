import React from 'react'
import home from "../css/home.module.css";

const Random = ({children, title, style}) => {
    return (
      <React.Fragment>
        <div className={home.container__picks__title} id={style}>{title}</div>
        <div className={home.container__picks}>
          <div className={home.container__picks__cards}>
          {children}
          </div>
        </div>
      </React.Fragment>
    );
}

export default Random;
