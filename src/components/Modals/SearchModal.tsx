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
import AlbumPlaylist from "../Album/AlbumPlaylist";
import AlbumPlaylistSkeleton from "../Album/AlbumPlaylistSkeleton";

interface SearchModalProps {
  keyword: string;
  results: Track[];
}
function SearchModal({ keyword, results }: SearchModalProps) {
  const [isOpen, setIsOpen] = useRecoilState(searchModalState);
  const { playlist } = useLocalStoragePlaylist();

  useEffect(() => {
    console.log("keyword", keyword);
  }, [keyword]);
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
                {results ? (
                  <AlbumPlaylist playlist={results} />
                ) : (
                  <AlbumPlaylistSkeleton />
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
