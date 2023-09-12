"use client";

import { Icons } from "@/app/Icons";
import LoadingSpinner from "@/components/LoadingSpinner";
import SearchListCards from "@/components/Search/SearchListCards";
import useSearch from "@/hooks/useSearch";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function SearchModal({ params: { keyword } }: { params: { keyword: string } }) {
  const router = useRouter();
  const { searchedData, setSearchedData, isLoading, queryKey } = useSearch();
  const [inputKeyword, setInputKeyword] = useState(keyword || "");

  const handleSearchFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchedData([]);
    router.push(`/search?keyword=${inputKeyword}`);
  };

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
                    placeholder={"Search Artist, Music...."}
                    onChange={(e) => setInputKeyword(e.target.value)}
                    value={inputKeyword}
                  />
                </form>
              )}
            </ModalHeader>
            <ModalBody>
              {isLoading && queryKey && (
                <div className="flex w-full h-96 justify-center align-middle pl-12">
                  <LoadingSpinner />
                </div>
              )}
              {!isLoading && searchedData.length === 0 ? (
                <div className="w-full text-center">
                  Sorry.. No tracks found.
                </div>
              ) : (
                <SearchListCards playlist={searchedData} />
              )}
            </ModalBody>
          </>
        }
      </ModalContent>
    </Modal>
  );
}

export default SearchModal;
