"use client";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useDebounce } from "use-debounce";

export default function SearchInput() {
  const router = useRouter();
  const SearchParams = useSearchParams();
  const [search, setSearch] = useState(SearchParams.get("search") || "");
  const [debounceSearch] = useDebounce(search, 300);
  useEffect(() => {
    const currentQuery = queryString.parse(window.location.search);
    const updateQuery = { ...currentQuery, search: debounceSearch };
    const url = queryString.stringifyUrl(
      {
        url: window.location.pathname,
        query: updateQuery,
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
    console.log(url);
  }, [debounceSearch, router]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Input
      placeholder="Search anything with AI"
      value={search}
      onChange={handleSearch}
    />
  );
}
