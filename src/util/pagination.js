/**
 * Gets the current page from the URL query string.
 * @returns {number} The current page number.
 */
export const getCurrentPageFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get("page"));
  return isNaN(page) ? 1 : page;
};

/**
 * Updates the URL query string with the current page.
 * @param {number} currentPage - The current page number.
 */
export const updateURLWithPage = (currentPage) => {
  const params = new URLSearchParams(window.location.search);
  params.set("page", currentPage);
  window.history.pushState(
    {},
    "",
    `${window.location.pathname}?${params.toString()}`
  );
};

/**
 * Gets the array of page numbers for pagination.
 * @param {number} currentPage - The current page number.
 * @param {number} totalPages - The total number of pages.
 * @returns {number[]} The array of page numbers.
 */
export const getPageNumbers = (currentPage, totalPages) => {
  if (totalPages <= 0) return []; // Handle case where totalPages is 0 or less

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, currentPage + 1);

  if (endPage - startPage < 2) {
    startPage = Math.max(1, endPage - 2);
    endPage = Math.min(totalPages, startPage + 2);
  }

  return [startPage, startPage + 1, endPage]
    .filter((page) => page <= totalPages)
    .reduce((acc, page) => {
      if (!acc.includes(page)) acc.push(page);
      return acc;
    }, []);
};
