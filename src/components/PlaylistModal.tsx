import { PlaylistModalState } from "@/atoms";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { Icons } from "../app/Icons";
import PlaylistCards from "./Panel/PanelPlaylist/PlaylistCards";

export default function PlaylistModal() {
  const [isOpen, setIsOpen] = useRecoilState(PlaylistModalState);

  const [scrollBehavior, setScrollBehavior] = useState("inside");

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
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
