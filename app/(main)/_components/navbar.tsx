"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "../../../components/mode-toggle";
import { Logo } from "./logo";
import { toast } from "sonner";

const ClerkLogin = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return isLoading ? (
    <Spinner />
  ) : isAuthenticated ? (
    <UserButton afterSignOutUrl="/" />
  ) : (
    <SignInButton mode="modal">
      <Button variant="ghost" size="sm">
        Log in
      </Button>
    </SignInButton>
  );
};

const SupabaseLogin = () => {
  const { onOpen } = useAuthModal();
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const supabaseClient = useSupabaseClient();

  const handleLogout = () => {
    const promise = async () => {
      await supabaseClient.auth.signOut();
      router.refresh();
    };

    toast.promise(promise, {
      loading: "Logging out...",
      success: "Logged out",
      error: "Error logging out",
    });
  };

  return !!user ? (
    <>
      <Button className="ml-4" variant="ghost" onClick={handleLogout}>
        Supa Logout
      </Button>
      {pathname !== "/navigator" && (
        <Button variant="ghost" size="sm" asChild>
          <Link href="/navigator">Enter kOMO</Link>
        </Button>
      )}
    </>
  ) : (
    <Button className="ml-4" variant="ghost" onClick={onOpen}>
      Supa Login
    </Button>
  );
};

export const NavBar = () => {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-4",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />

      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        <SupabaseLogin />
        <ModeToggle />
        <ClerkLogin />
      </div>
    </div>
  );
};
