import React from "react";

const Header = ({ totalPages, pageInput, setPageInput, handleJumpToPage }) => {
  return (
    <div className="header">
      <h2>Projects</h2>
      <form onSubmit={handleJumpToPage} className="jump-to-page">
        <input
          type="number"
          min="1"
          max={totalPages}
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          placeholder="Jump to page"
        />
        <button type="submit">Go</button>
      </form>
    </div>
  );
};

export default Header;
