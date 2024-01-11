"use client";

import { useAuthModal } from "@/hooks/use-auth-modal";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CommonModal from "./common-modal";

export const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [onClose, router, session]);

  return (
    <CommonModal
      isOpen={isOpen}
      title="注册&登入"
      description="登入你的账号"
      onCancel={onClose}
    >
      <Auth
        providers={[]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#000",
                brandAccent: "#ccc",
              },
            },
          },
        }}
      />
    </CommonModal>
  );
};
