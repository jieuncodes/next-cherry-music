import { PlaylistModalState } from "@/atoms";
import usePlayerControls from "@/hooks/usePlayerControls";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { Icons } from "../app/Icons";
import PlaylistCards from "./Panel/PanelPlaylist/PlaylistCards";
import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";

export default function PlaylistModal() {
  const [isOpen, setIsOpen] = useRecoilState(PlaylistModalState);
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const { emptyPlaylist } = useLocalStoragePlaylist();
  return (
    <div className="flex flex-col gap-2">
      <Modal
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(!isOpen)}
        scrollBehavior={scrollBehavior}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row gap-3 items-center">
                <Icons.listMusic />
                <h1>Playlist</h1>
              </ModalHeader>
              <ModalBody>
                <PlaylistCards />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={emptyPlaylist}>
                  <Icons.trash2 />
                  ALL
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
