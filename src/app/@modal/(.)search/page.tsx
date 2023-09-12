"use client";

import { Icons } from "@/app/Icons";
import { fetchCherryMusicTracks } from "@/app/api/cherryMusic/track/service";
import LoadingSpinner from "@/components/LoadingSpinner";
import SearchListCards from "@/components/Search/SearchListCards";
import useDebounce from "@/hooks/useDebounce";
import { Track } from "@/lib/server/database.types";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

function SearchModal({ params: { keyword } }: { params: { keyword: string } }) {
  console.log("keyword", keyword);

  const [inputKeyword, setInputKeyword] = useState(keyword || "");
  const debouncedKeyword = useDebounce(inputKeyword, 500);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [res, setRes] = useState<Track[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryKey = searchParams.get("keyword");
  console.log("key", queryKey);

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

  useEffect(() => {
    setInputKeyword(queryKey || "");
  }, [queryKey]);

  useEffect(() => {
    if (debouncedKeyword) {
      search(debouncedKeyword);
      router.push(`/search?keyword=${debouncedKeyword}`);
    }
  }, [debouncedKeyword]);

  const handleSearchFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search?keyword=${debouncedKeyword}`);
  };

  console.log("keyword", keyword);
  return (
    <Modal
      isOpen={true}
      onOpenChange={() => router.back()}
      scrollBehavior="inside"
    >
      <ModalContent>
        {
          <>
            <ModalHeader className="flex flex-row gap-3 items-center">
              {keyword ? (
                <>
                  <Icons.searchIcon />
                  <h1>{`Search result for ${keyword}`}</h1>
                </>
              ) : (
                <form onSubmit={handleSearchFormSubmit} className="mt-5 w-full">
                  <Input
                    startContent={<Icons.searchIcon />}
                    placeholder="Search Artist, Music...."
                    onChange={(e) => setInputKeyword(e.target.value)}
                  />
                </form>
              )}
            </ModalHeader>
            <ModalBody>
              {isLoading && keyword && (
                <div className="flex w-full h-96 justify-center align-middle pl-12">
                  <LoadingSpinner />
                </div>
              )}
              {!isLoading && res.length === 0 ? (
                <div className="w-full text-center">
                  Sorry.. No tracks found.
                </div>
              ) : (
                <SearchListCards playlist={res} />
              )}
            </ModalBody>
          </>
        }
      </ModalContent>
    </Modal>
  );
}

export default SearchModal;
