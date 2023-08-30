"use client";

import { SearchForm, SearchInput } from "@/styles/Search";
import { Icons } from "../app/Icons";
import { FormEvent, useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useRecoilState, useSetRecoilState } from "recoil";
import { searchModalState } from "@/atoms";
import SearchModal from "./Modals/SearchModal";
import { Track } from "@/lib/server/database.types";
import { Artist, TrackSearchResult } from "@/types/lastFmTypes";
import { fetchCherryMusicTracks } from "@/app/api/cherryMusic/track/service";
import { lastFmFetcher } from "@/app/api/lastFm/fetcher";

export default function Search() {
  const [isOpen, setIsOpen] = useRecoilState(searchModalState);
  const [value, setValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [res, setRes] = useState<Track[]>([]);

  const search = async (keyword: string) => {
    try {
      const res = await lastFmFetcher.fetchTitleSearchResults(keyword);
      const tracksArr = res.results.trackmatches.track;
      console.log("resresres", tracksArr);
      setRes(tracksArr);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsOpen(true);
    setSearchValue(value);
    setValue("");
  };

  useEffect(() => {
    searchValue && search(searchValue);
  }, [searchValue]);

  return (
    <SearchForm onSubmit={handleSearchFormSubmit}>
      <Icons.searchIcon
        size={20}
        className="absolute font-bold ml-2 2xl:mt-[0.7rem] mt-2.5 "
      />
      <SearchInput
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {searchValue && <SearchModal keyword={searchValue} results={res} />}
    </SearchForm>
  );
}
