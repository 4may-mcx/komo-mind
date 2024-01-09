"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
        <span className="underline">KOMO</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        KOMO is the connected knowledge management platform.
      </h3>

      <div className="w-full flex items-center justify-center">
        {isLoading ? (
          <Spinner size="lg" />
        ) : isAuthenticated ? (
          <Button asChild>
            <Link href="/documents">
              Enter your mind <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        ) : (
          <SignInButton mode="modal">
            <Button>
              Get your mind
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
};
