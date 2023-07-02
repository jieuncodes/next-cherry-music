"use client";

import { SearchContainer, SearchInput } from "@/styles/Search";
import { Icons } from "./Icons";


export default function Search() {
  return (
    <SearchContainer>
      <Icons.searchIcon
        size={26}
        className="absolute font-bold ml-2 2xl:mt-[0.7rem] mt-[0.5rem] "
      />
      <SearchInput placeholder="Search" />
    </SearchContainer>
  );
}
