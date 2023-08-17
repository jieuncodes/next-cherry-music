"use client";

import AuthModal from "@/components/AuthModal";
import PlaylistModal from "@/components/PlaylistModal";

function ModalProvider({}) {
  return (
    <>
      <AuthModal />
      <PlaylistModal />
    </>
  );
}

export default ModalProvider;
