"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/ui/alert-dialog";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useAuthModal } from "@/hooks/use-auth-modal";

export const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <AlertDialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>注册&登入</AlertDialogTitle>
          <AlertDialogDescription>login your account</AlertDialogDescription>
        </AlertDialogHeader>
        <Auth
          providers={["github"]}
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
        <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
          取消
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};
