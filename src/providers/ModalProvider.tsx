"use client";

import AuthModal from "@/components/Modals/AuthModal";
import PlaylistModal from "@/components/Modals/PlaylistModal";

function ModalProvider({}) {
  return (
    <>
      <AuthModal />
      <PlaylistModal />
    </>
  );
}

export default ModalProvider;
