import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import Pagination from "./components/Pagination";
import Table from "./components/Table";
import { GET_PROJECTS_API, TABLE_MAX_ROW_SIZE } from "./constants/api";
import "./styles/app.css";
import "./styles/form.css";
import "./styles/global.css";
import "./styles/pagination.css";
import "./styles/table.css";
import {
  getCurrentPageFromURL,
  getPageNumbers,
  updateURLWithPage,
} from "./util/pagination";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(getCurrentPageFromURL);
  const [pageInput, setPageInput] = useState("");

  useEffect(() => {
    updateURLWithPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetch(GET_PROJECTS_API)
      .then((response) => response.json())
      .then((data) => setProjects(data || []))
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleNext = () => setCurrentPage((prev) => prev + 1);
  const handlePrevious = () => setCurrentPage((prev) => prev - 1);

  const startIndex = (currentPage - 1) * TABLE_MAX_ROW_SIZE;
  const currentRecords = projects.slice(
    startIndex,
    startIndex + TABLE_MAX_ROW_SIZE
  );
  const totalPages = Math.ceil(projects.length / TABLE_MAX_ROW_SIZE);

  const handleJumpToPage = (event) => {
    event.preventDefault();
    const pageNumber = parseInt(pageInput, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    } else {
      alert("Please enter a valid page number");
    }
  };

  return (
    <div className="App">
      <Header
        totalPages={totalPages}
        pageInput={pageInput}
        setPageInput={setPageInput}
        handleJumpToPage={handleJumpToPage}
      />
      <Table
        isLoading={isLoading}
        currentRecords={currentRecords}
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        setCurrentPage={setCurrentPage}
        getPageNumbers={() => getPageNumbers(currentPage, totalPages)}
      />
    </div>
  );
};

export default App;
