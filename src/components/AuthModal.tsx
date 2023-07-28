"use client";

import React, { useEffect, FC } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import { useRecoilState } from "recoil";
import { authModalState } from "@/atoms";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";

function AuthModal({}) {
  const [isOpen, setIsOpen] = useRecoilState(authModalState);
  const { session } = useSessionContext();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (session) {
      router.refresh();
      setIsOpen(false);
    }
  }, [session, router, isOpen]);

  return (
    <Modal isOpen={isOpen} onOpenChange={() => setIsOpen(!isOpen)} size="lg">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          🍒 Welcome to Cherry!
        </ModalHeader>
        <ModalBody>
          <Auth
            supabaseClient={supabaseClient}
            providers={["github", "google"]}
            magicLink={true}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#ff5173",
                    brandAccent: "#ff5174ca",
                  },
                },
              },
            }}
            theme="light"
          />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AuthModal;
