"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cuboid } from "lucide-react";
import { useRouter } from "next/navigation";
import { useServerStore } from "../_hook/use-server-store";

export const ServerSelect = ({
  defaultValue,
  onChange,
}: {
  defaultValue: string;
  onChange?: (id: string) => void;
}) => {
  const { servers } = useServerStore();
  const router = useRouter();
  const handleValueChange = (id: string) => {
    onChange?.(id);
    router.push(`/chat/${id}`);
  };

  return (
    <Select defaultValue={defaultValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full h-8 border-[1px] border-neutral-300">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {servers.map((server) => (
            <SelectItem value={server.id} key={server.id}>
              <div className="flex h-full items-center gap-x-2">
                {/* <Avatar className="h-6 w-6">
                  <AvatarImage src={server.imageUrl} />
                  <AvatarFallback>#</AvatarFallback>
                </Avatar> */}
                <Cuboid className="h-3.5 w-3.5" />
                <p className="truncate flex-1">{server.name}</p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
