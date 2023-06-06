import tw from "tailwind-styled-components";
import SearchIcon from "@mui/icons-material/Search";

export const SearchContainer = tw.div`relative`;
export const SearchInput = tw.input`bg-white rounded-lg w-full h-full p-3 font-light pl-10`;
export const StyledSearchIcon = tw(
  SearchIcon
)`absolute left-3 top-1/2 transform -translate-y-1/2`;
