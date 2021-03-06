import React from "react";

export default MagnifyingGlass;

function Filled() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      title="search"
      data-testid="icon-search"
      className="w-full text-gray-700 fill-current"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Outline() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      title="search"
      data-testid="icon-search"
      className="w-full text-gray-700"
      fill="none"
      // viewBox="0 0 24 24"
      viewBox="0 0 23 23"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function MagnifyingGlass({ currentPage }) {
  return (
    <>
      {currentPage === "search" && <Filled />}
      {currentPage !== "search" && <Outline />}
    </>
  );
}
