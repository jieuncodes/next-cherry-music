"use client";

import { SearchForm, SearchInput } from "@/styles/Search";
import { Icons } from "../app/Icons";
import { FormEvent, useEffect, useState } from "react";
import { Track } from "@/lib/server/database.types";
import { fetchCherryMusicTracks } from "@/app/api/cherryMusic/track/service";
import { useRouter } from "next/navigation";

export default function Search() {
  const [value, setValue] = useState<string>("");
  const [res, setRes] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const search = async (keyword: string) => {
    try {
      setIsLoading(true);
      const res = await fetchCherryMusicTracks({
        query: "searchTitle",
        keyword: keyword,
      });
      setRes(res);
      setIsLoading(false);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleSearchFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search(value);
    router.push(`/search?keyword=${value}`);
    setValue("");
  };

  return (
    <SearchForm onSubmit={handleSearchFormSubmit}>
      <Icons.searchIcon
        size={20}
        className="absolute font-bold ml-2 2xl:mt-[0.7rem] mt-2.5 hover:cursor-pointer"
        onClick={() => {
          router.push(`/search?keyword=${value}`);
        }}
      />
      <SearchInput
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </SearchForm>
  );
}
