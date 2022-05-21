import React from "react";
import "./pagination.css";
const Pagination = ({ page, totalPage, handlePageCLick }) => {
  const total = [];
  for (let i = 1; i <= totalPage; i++) {
    total.push(i);
  }
  return (
    <ul className="pagination">
      <button disabled={page === 1} value="prev" onClick={handlePageCLick}>
        Prev
      </button>
      {total.map((num) => {
        return (
          <li value={num} key={num} onClick={handlePageCLick}>
            {num}
          </li>
        );
      })}
      <button disabled={page === 9} value="next" onClick={handlePageCLick}>
        Next
      </button>
    </ul>
  );
};

export default Pagination;
