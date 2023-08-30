"use client";

import { SearchContainer, SearchInput } from "@/styles/Search";
import { Icons } from "../app/Icons";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";

export default function Search() {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  console.log("value", debouncedValue);
  return (
    <SearchContainer>
      <Icons.searchIcon
        size={20}
        className="absolute font-bold ml-2 2xl:mt-[0.7rem] mt-2.5 "
      />
      <SearchInput
        placeholder="Search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </SearchContainer>
  );
}
