"use client";

import { authModalState } from "@/atoms";
import JoinModal from "@/components/JoinModal";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

interface ModalProviderProps {}

const ModalProvider: React.FC<ModalProviderProps> = ({}) => {
  return (
    <>
      <JoinModal />
      {/* <LoginModal /> */}
    </>
  );
};

export default ModalProvider;
