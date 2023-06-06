"use client";
import {
  SearchContainer,
  SearchInput,
  StyledSearchIcon,
} from "../styles/Search";

export default function Search() {
  return (
    <SearchContainer>
      <StyledSearchIcon />
      <SearchInput placeholder="Search" />
    </SearchContainer>
  );
}
