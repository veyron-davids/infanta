import React from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../store/product-slice";
import Footer from "../components/footer";
import PreCard from "../components/preCard";
import ProfileTitle from "../components/profileTitle";
import Random from "../components/random";
import WishListCard from "../components/wishListCard";
import wish from "../css/profile.module.css";

const WishlistMobile = () => {
  const products = useSelector(selectAllProducts);
  return (
    <div className={wish.wish__container}>
      <div>
        <ProfileTitle locations="/profile" title="Items You Liked" />
        <WishListCard />
        <WishListCard />
        <WishListCard />
        <WishListCard />
        <WishListCard />
        <WishListCard />
        <WishListCard />
        <WishListCard />
      </div>
      <div>
        <div className={wish.collections}>
          <Random title="Recommended For You">
            {products &&
              products
                .slice(0, 10)
                .map((item) => <PreCard key={item._id} product={item} />)}
          </Random>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default WishlistMobile;
