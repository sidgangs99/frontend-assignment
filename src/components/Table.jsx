import React from "react";

const Table = ({
  isLoading,
  currentRecords,
  currentPage,
  totalPages,
  startIndex,
}) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <div id="loading">Loading ...</div>
          ) : currentPage <= totalPages ? (
            currentRecords.map((project, index) => (
              <tr key={index}>
                <td>{startIndex + index + 1}</td>
                <td>{project["percentage.funded"]}</td>
                <td>{project["amt.pledged"]}</td>
              </tr>
            ))
          ) : (
            <div id="loading">
              Insufficient data available. <br />
              The last page is {totalPages}.
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
