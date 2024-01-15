"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import Image from "next/image";
import { useRouter } from "next/navigation";
import Typography from "@/components/typography";

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
      <SelectTrigger className="w-full h-6 border-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {servers.map((server) => (
            <SelectItem
              value={server.id}
              key={server.id}
              className="line-clamp-1"
            >
              <div className="flex items-center gap-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={server.imageUrl} />
                </Avatar>
                <Typography.Small className="line-clamp-1">
                  {server.name}
                </Typography.Small>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
