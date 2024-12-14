import {
  getCurrentPageFromURL,
  getPageNumbers,
  updateURLWithPage,
} from "./pagination";

describe("Pagination Utilities", () => {
  beforeEach(() => {
    // Mock the global window location
    delete window.location;
    window.location = {
      search: "",
      pathname: "/test-path",
    };

    // Mock history.pushState
    delete window.history.pushState;
    window.history.pushState = jest.fn();
  });

  describe("getCurrentPageFromURL", () => {
    test("returns 1 if no page query parameter exists", () => {
      expect(getCurrentPageFromURL()).toBe(1);
    });

    test("returns the correct page number from the query string", () => {
      window.location.search = "?page=5";
      expect(getCurrentPageFromURL()).toBe(5);
    });

    test("handles invalid page numbers gracefully", () => {
      window.location.search = "?page=not-a-number";
      expect(getCurrentPageFromURL()).toBe(1);
    });
  });

  describe("updateURLWithPage", () => {
    test("updates the URL query string with the current page", () => {
      updateURLWithPage(3);
      expect(window.history.pushState).toHaveBeenCalledWith(
        {},
        "",
        "/test-path?page=3"
      );
    });

    test("preserves existing query parameters while updating the page", () => {
      window.location.search = "?filter=active";
      updateURLWithPage(2);
      expect(window.history.pushState).toHaveBeenCalledWith(
        {},
        "",
        "/test-path?filter=active&page=2"
      );
    });
  });

  describe("getPageNumbers", () => {
    test("returns correct page numbers when currentPage is in the middle", () => {
      expect(getPageNumbers(5, 10)).toEqual([4, 5, 6]);
    });

    test("returns correct page numbers when currentPage is at the start", () => {
      expect(getPageNumbers(1, 10)).toEqual([1, 2, 3]);
    });

    test("returns correct page numbers when currentPage is at the end", () => {
      expect(getPageNumbers(10, 10)).toEqual([8, 9, 10]);
    });

    test("handles cases where totalPages is less than 3", () => {
      expect(getPageNumbers(1, 2)).toEqual([1, 2]);
      expect(getPageNumbers(2, 2)).toEqual([1, 2]);
    });

    test("handles cases where totalPages is 0", () => {
      expect(getPageNumbers(1, 0)).toEqual([]);
    });
  });
});
