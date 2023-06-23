"use client";

import AuthModal from "@/components/AuthModal";

interface ModalProviderProps {}

const ModalProvider: React.FC<ModalProviderProps> = ({}) => {
  return (
    <>
      <AuthModal />
      {/* <LoginModal /> */}
    </>
  );
};

export default ModalProvider;
