"use client";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Profile } from "@prisma/client";
import { CommandEmpty } from "cmdk";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useServerStore } from "../_hook/use-server-store";

export interface SearchDataType {
  label: string;
  type: "channel" | "member";
  data:
    | {
        id: string;
        name: string;
        icon: ReactNode;
      }[];
}

export const SearchServer = ({
  data,
  profile,
}: {
  data?: SearchDataType[];
  profile: Profile;
}) => {
  const { currentServer } = useServerStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  });

  const onClick = ({
    id,
    type,
  }: {
    id: string;
    type: "channel" | "member";
  }) => {
    setOpen(false);
    if (type === "channel") {
      return router.push(`/chat/${currentServer?.id}/channels/${id}`);
    }
    if (type === "member") {
      return router.push(`/chat/${currentServer?.id}/conversations/${id}`);
    }
  };

  return (
    <div className="h-full w-full">
      <button
        onClick={() => setOpen(true)}
        className="h-full w-full group p-2 flex items-center gap-x-2 hover:bg-neutral-300 transition"
      >
        <Search className="h-4 w-4 text-neutral-500" />
        <p className="font-semi text-xs text-neutral-500 group-hover:text-neutral-600 transition">
          Search
        </p>
        <kbd className="h-5 pointer-events-none inline-flex translate-y-[0.1rem] select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="text-xs">Ctrl K</span>
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="搜索所有频道和成员" />
        <CommandList>
          <CommandEmpty>没有结果嘞</CommandEmpty>
          {data?.map(({ label, type, data }) => {
            if (!data.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data.map(({ id, icon, name }) => {
                  return (
                    <CommandItem
                      key={id}
                      onSelect={() => onClick({ id, type })}
                    >
                      {icon}
                      <span>{name.replace("null", "")}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </div>
  );
};
