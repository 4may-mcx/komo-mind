import { Button } from "@/components/ui/button";
import { initialProfile } from "@/lib/initial-profile";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Heading = async () => {
  const profile = await initialProfile();

  return (
    <div className="max-w-3xl space-y-4 mt-32">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
        <span className="underline">KOMO</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        KOMO is the connected knowledge management platform.
      </h3>

      <div className="w-full flex items-center justify-center">
        {profile && (
          <Button asChild>
            <Link href="/navigator">
              Enter your mind <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};
