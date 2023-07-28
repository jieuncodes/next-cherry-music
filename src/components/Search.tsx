"use client";

import { SearchContainer, SearchInput } from "@/styles/Search";
import { Icons } from "../app/Icons";

export default function Search() {
  return (
    <SearchContainer>
      <Icons.searchIcon
        size={20}
        className="absolute font-bold ml-2 2xl:mt-[0.7rem] mt-2.5 "
      />
      <SearchInput placeholder="Search" />
    </SearchContainer>
  );
}
