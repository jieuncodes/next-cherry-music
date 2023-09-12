"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { useRouter } from "next/navigation";

function AuthModal({}) {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  return (
    <Modal isOpen={true} onOpenChange={() => router.back()} size="lg">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          🍒 Welcome to Cherry!
        </ModalHeader>
        <ModalBody>
          <Auth
            supabaseClient={supabaseClient}
            providers={["github", "google", "kakao"]}
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
      </ModalContent>
    </Modal>
  );
}

export default AuthModal;
