"use client";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import React from "react";

function Pagination({
  isNext,
  page = 1,
}: {
  isNext: boolean;
  page: number | string;
}) {
  const parsedPage = Number(page);
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1;
  const router = useRouter();

  const handleClick = (type: "prev" | "next") => {
    const currentQuery = queryString.parse(window.location.search);
    const updatedQuery = {
      ...currentQuery,
      page: type === "prev" ? currentPage - 1 : currentPage + 1,
    };

    const url = queryString.stringifyUrl(
      {
        url: window.location.pathname,
        query: updatedQuery,
      },
      { skipEmptyString: true, skipNull: true }
    );

    return router.push(url);
  };
  return (
    <div className="flex items-center justify-center gap-4 p-5">
      <button
        disabled={currentPage <= 1}
        onClick={() => handleClick("prev")}
        className={`rounded-xl px-4 py-2 text-gray-300 ${
          currentPage <= 1
            ? "cursor-not-allowed bg-tertiary opacity-50"
            : "bg-tertiary hover:bg-main"
        }`}
      >
        previous
      </button>
      <div className="rounded-xl bg-main px-4 py-2 text-gray-300">
        {currentPage}
      </div>
      <button
        disabled={!isNext}
        onClick={() => handleClick("next")}
        className={`rounded-xl px-4 py-2 text-gray-300 ${
          !isNext
            ? "cursor-not-allowed bg-tertiary opacity-50"
            : "bg-tertiary hover:bg-main"
        }`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
