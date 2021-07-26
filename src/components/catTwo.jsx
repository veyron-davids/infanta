import axios from "axios";
import React, { useEffect, useState } from "react";
import prod from "../css/productCont.module.css";
import Card from "./card";

const CatTwo = ({ products }) => {
  const [data, setData] = useState([]);

  const fetch = async () => {
    const response = await axios.get("http://localhost:80/api/products/vogue");
    setData(response.data.vogue);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className={prod.container__two}>
      {data.map((item) => (
        <Card key={item._id} product={item} />
      ))}
    </div>
  );
};

export default CatTwo;
