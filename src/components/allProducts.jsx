import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import "../css/pagination.css";
import prod from "../css/productCont.module.css";
import { fetchProducts, selectAllProducts } from "../store/product-slice";
import Card from "./card";

const AllProducts = () => {
  const products = useSelector(selectAllProducts);
  const [pageNumber, setPageNumber] = useState(0);

  const productsPerPage = 12;
  const pagesVisited = pageNumber * productsPerPage;
  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" });
    dispatch(fetchProducts());
  }, [dispatch, pageNumber]);

  return (
    <div className={prod.container__two}>
      <div className={prod.container__two__inner}>
        {products &&
          products
            .slice(pagesVisited, pagesVisited + productsPerPage)
            .map((item) => <Card key={item._id} product={item} />)}
      </div>
      <div className={prod.paginate}>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
};

export default AllProducts;
