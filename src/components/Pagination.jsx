import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  handlePrevious,
  handleNext,
  setCurrentPage,
  getPageNumbers,
}) => {
  return (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
        &lt;&lt;
      </button>
      <button disabled={currentPage === 1} onClick={handlePrevious}>
        &lt;
      </button>
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      ))}
      <button disabled={currentPage === totalPages} onClick={handleNext}>
        &gt;
      </button>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(totalPages)}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
