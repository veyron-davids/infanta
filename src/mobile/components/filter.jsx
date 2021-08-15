import React from "react";
import { BsGrid1X2Fill, BsGridFill } from "react-icons/bs";
import { HiArrowNarrowUp } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import filter from "../../mobile/css/products.module.css";
import { selectGrid, switchView } from "../../store/mobile-slice";

const Filter = () => {
  const dispatch = useDispatch();
  const grid = useSelector(selectGrid);

  const scroll = () => {
    window.scrollTo({ behavior: "smooth", top: "0px" });
  };

  return (
    <div className={filter.container__filter}>
      {grid && (
        <div
          className={filter.container__filter__inner}
          onClick={() => {
            dispatch(switchView());
          }}
        >
          <BsGridFill />
          <span id={filter.switch}>SWITCH GRID VIEW</span>
        </div>
      )}
      {!grid && (
        <div
          className={filter.container__filter__inner}
          onClick={() => {
            dispatch(switchView());
          }}
        >
          <BsGrid1X2Fill id={filter.list} />
          <span id={filter.switch}>SWITCH LIST VIEW</span>
        </div>
      )}
      <div className={filter.container__filter__inner__two} onClick={scroll}>
        <HiArrowNarrowUp /> <span>TOP</span>
      </div>
    </div>
  );
};

export default Filter;
