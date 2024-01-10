"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { ModeToggle } from "../../../components/mode-toggle";
import { Logo } from "./logo";
import { usePathname } from "next/navigation";
import { useAuthModal } from "@/hooks/use-auth-modal";

export const NavBar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const pathname = usePathname();
  const scrolled = useScrollTop();

  const { onOpen } = useAuthModal();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-4",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <Button className="ml-4" variant="ghost" onClick={onOpen}>
        Supabase Login
      </Button>
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading ? (
          <Spinner />
        ) : isAuthenticated ? (
          <>
            {pathname !== "/navigator" && (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/navigator">Enter kOMO</Link>
              </Button>
            )}
            <UserButton afterSignOutUrl="/" />
          </>
        ) : (
          <SignInButton mode="modal">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </SignInButton>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};
