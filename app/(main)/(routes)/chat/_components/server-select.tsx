"use client";

import { Server } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export const ServerSelect = ({
  servers,
  value,
}: {
  servers: Server[];
  value: string;
}) => {
  const router = useRouter();
  const handleValueChange = (id: string) => {
    router.push(`/chat/${id}`);
  };

  return (
    <Select defaultValue={value} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full h-7 border-0 ring-0">
        <SelectValue className="ring-0" placeholder="Select a server" />
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
