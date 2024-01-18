"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Spinner } from "@/components/ui/spinner";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import { Logo } from "./logo";

export const NavBar = () => {
  const scrolled = useScrollTop();
  const { isLoaded } = useUser();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-4",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />

      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        <ModeToggle />
        {isLoaded ? <UserButton afterSignOutUrl="/" /> : <Spinner />}
      </div>
    </div>
  );
};
