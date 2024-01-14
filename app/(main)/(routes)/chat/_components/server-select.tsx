"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Server } from "@prisma/client";
import { useRouter } from "next/navigation";

export const ServerSelect = ({
  servers,
  defaultValue,
}: {
  servers: Server[];
  defaultValue: string;
}) => {
  const router = useRouter();
  const handleValueChange = (id: string) => {
    router.push(`/chat/${id}`);
  };

  return (
    <Select defaultValue={defaultValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full h-7 border-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Servers</SelectLabel>
          {servers.map((server) => (
            <SelectItem value={server.id} key={server.id}>
              {server.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
