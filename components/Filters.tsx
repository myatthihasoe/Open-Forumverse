"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useState } from "react";

export default function Filters() {
  const [filter, setFilter] = useState("");
  const router = useRouter();
  const handleFilter = (filterType: string) => {
    if (filterType === filter) {
      setFilter("");
    }
    setFilter(filterType);
    const currentQuery = queryString.parse(window.location.search);
    const updateQuery = {
      ...currentQuery,
      filter: filterType === filter ? "" : filterType,
    };
    const url = queryString.stringifyUrl({
      url: window.location.pathname,
      query: updateQuery,
    });
    router.push(url);
  };
  return (
    <div className="flex space-x-6 p-5">
      <button
        onClick={() => handleFilter("react")}
        className={`px-4 py-2 text-gray-300 rounded-xl ${filter === "react" ? "bg-main" : "bg-primary"}`}
      >
        React
      </button>
      <button
        onClick={() => handleFilter("nextjs")}
        className={`px-4 py-2 text-gray-300 rounded-xl ${filter === "nextjs" ? "bg-main" : "bg-primary"}`}
      >
        Nextjs
      </button>
      {filter}
    </div>
  );
}
