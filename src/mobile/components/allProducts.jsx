import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import all from "../../mobile/css/products.module.css";
import { selectAllProducts } from "../../store/product-slice";
import {selectGrid } from "../../store/mobile-slice";
import GridCards from "./gridCards";
import ListCards from "./listCards";

const AllProducts = () => {
  const products = useSelector(selectAllProducts);
  const [pageNumber, setPageNumber] = useState(0);
  const grid = useSelector(selectGrid);

  const productsPerPage = 12;
  const pagesVisited = pageNumber * productsPerPage;
  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [pageNumber]);

  return (
    <div className={all.container}>
      <div className={all.container__title}>ALL PRODUCTS</div>
      <div className={all.container__content}>
        {grid &&
          products &&
          products
            .slice(pagesVisited, pagesVisited + productsPerPage)
            .map((item) => <GridCards key={item._id} product={item} />)}
        {!grid &&
          products &&
          products
            .slice(pagesVisited, pagesVisited + productsPerPage)
            .map((item) => <ListCards key={item._id} product={item} />)}
      </div>
      <div className={all.paginate}>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          breakLabel={"..."}
          // previousLinkClassName={"previousBttn"}
          // nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
};

export default AllProducts;
