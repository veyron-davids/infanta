import React from "react";
import { FiMail } from "react-icons/fi";
import inbox from "../css/profile.module.css";

const Inbox = () => {
  return (
    <React.Fragment>
      <div className={inbox.container__two}>
        <div className={inbox.content}>
          <span id={inbox.inbox__logo}>
            <FiMail id={inbox.logo} />
            <div id={inbox.count}>
              <div>0</div>
            </div>
          </span>
          <span id={inbox.span}>You don't have any messages</span>
          <span id={inbox.span}>
            Here you will be able to see all the messages that we send you.
          </span>{" "}
          <span id={inbox.span}> Stay tuned</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Inbox;
