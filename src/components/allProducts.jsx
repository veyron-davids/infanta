import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectAllProducts } from "../store/product-slice";
import prod from "../css/productCont.module.css";
import Card from "./card";

const AllProducts = () => {
  const products = useSelector(selectAllProducts);
  const dispatch = useDispatch();
  // const fetch = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:80/api/products/vogue"
  //     );
  //     if (!response.data) {
  //       setData(localStorage.getItem("vogue"));
  //     }
  //     setData(response.data.vogue);
  //     localStorage.setItem("vogue", JSON.stringify(response.data.vogue));
  //   } catch (error) {
  //     setData(JSON.parse(localStorage.getItem("vogue")));
  //     //  console.log(JSON.parse(localStorage.getItem("vogue")));
  //   }
  // };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={prod.container__two}>
      {products &&
        products.map((item) => <Card key={item._id} product={item} />)}
    </div>
  );
};

export default AllProducts;
