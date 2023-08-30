import { searchModalState } from "@/atoms";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { Icons } from "../../app/Icons";
import PlaylistCards from "../Playlist/PlaylistCards";
import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";
import { useEffect } from "react";
import { Track } from "@/lib/server/database.types";
import LoadingSpinner from "../LoadingSpinner";
import SearchListCards from "../Search/SearchListCards";

interface SearchModalProps {
  keyword: string | null;
  results: Track[];
  isLoading: boolean;
}
function SearchModal({ keyword, results, isLoading }: SearchModalProps) {
  const [isOpen, setIsOpen] = useRecoilState(searchModalState);
  return (
    <div className="flex flex-col gap-2">
      <Modal
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(!isOpen)}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row gap-3 items-center">
                <Icons.listMusic />
                <h1>{`Search result for "${keyword}"`}</h1>
              </ModalHeader>
              <ModalBody>
                {isLoading && (
                  <div className="flex w-full h-96 justify-center align-middle pl-12">
                    <LoadingSpinner />
                  </div>
                )}
                {!isLoading && results.length === 0 ? (
                  <div className="w-full text-center">
                    Sorry.. No tracks found.
                  </div>
                ) : (
                  <SearchListCards playlist={results} />
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default SearchModal;
