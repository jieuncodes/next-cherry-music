"use client";

import { Button } from "@nextui-org/button";
import { authModalState } from "@/atoms";
import { useRecoilState } from "recoil";
import { Grid, PopoverContainer, Title } from "@/styles/AuthPopover";

const AuthPopover = () => {
  

  return (
    <PopoverContainer>
      <Title>Welcome Back!</Title>
      <PopoverContainer></PopoverContainer>
    </PopoverContainer>
  );
};

export default AuthPopover;
