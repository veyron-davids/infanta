import React from "react";
import { FiMail } from "react-icons/fi";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../store/product-slice";
import Footer from "../components/footer";
import ProfileTitle from "../components/profileTitle";
import PreCard from "../components/preCard";
import Random from "../components/random";
import inbox from "../css/profile.module.css";

const InboxMobile = () => {
  const products = useSelector(selectAllProducts);
  return (
    <div className={inbox.inbox__container}>
      <ProfileTitle locations="/profile" title="Inbox Messages" />
      <div className={inbox.inbox__message__box}>
        <div className={inbox.message__container}>
          <FiMail id={inbox.mail} />
          <div className={inbox.message__count}>0</div>
        </div>
        <span id={inbox.span}>You don't have any messages</span>
        <span id={inbox.span}>
          Here you will be able to see all the messages that we send you.
        </span>
        <span>Stay tuned</span>
      </div>
      <div className={inbox.collections}>
        <Random title="Recommended For You">
          {products &&
            products
              .slice(0, 10)
              .map((item) => <PreCard key={item._id} product={item} />)}
        </Random>
      </div>
      <div className={inbox.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default InboxMobile;
