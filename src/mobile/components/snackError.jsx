import React from 'react'
import { MdErrorOutline } from "react-icons/md";
import over from "../css/bottomDrawer.module.css";

const SnackError = ({msg}) => {
    return (
      <React.Fragment>
        <div className={over.snack}>
          <MdErrorOutline /> <span>{msg}</span>
        </div>
      </React.Fragment>
    );
}

export default SnackError
