import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_PAGE } from "../store/allJobSlice";
import "../styles/Pagination.css";

const Pagination = () => {
  const { numOfPages, page } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    let newPage = page + 1;

    if (newPage > numOfPages) {
      newPage = 1;
    }

    dispatch(CHANGE_PAGE(newPage));
  };
  const prevPage = () => {
    let newPage = page - 1;

    if (newPage < 1) {
      newPage = numOfPages;
    }

    dispatch(CHANGE_PAGE(newPage));
  };

  return (
    <section className="paginationBar">
      <button onClick={prevPage} className="btnNext">
        <HiChevronDoubleLeft />
        <span>Perv</span>
      </button>

      <div className="pageConta">
        {pages.map((pageNumber) => (
          <button
            className={pageNumber === page ? "activeBtn" : "notActive"}
            key={pageNumber}
            onClick={() => dispatch(CHANGE_PAGE(pageNumber))}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button onClick={nextPage} className="btnNext">
        <span>Next</span> <HiChevronDoubleRight />
      </button>
    </section>
  );
};

export default Pagination;
