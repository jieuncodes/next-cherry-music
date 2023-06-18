import tw from "tailwind-styled-components";
import SearchIcon from "@mui/icons-material/Search";

export const SearchContainer = tw.div`relative self-center`;
export const SearchInput = tw.input`bg-white/20 rounded-lg w-full px-3 py-1 font-light pl-10 text-white ring-white placeholder-white/70`;
export const StyledSearchIcon = tw(
  SearchIcon
)`absolute left-2.5 top-1/2 transform -translate-y-1/2 text-white/80`;
