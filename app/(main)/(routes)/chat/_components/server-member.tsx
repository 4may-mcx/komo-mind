"use client";

import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { RoleIconMap } from "../_types";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

export const ServerMember = ({ member, server }: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();

  const icon = RoleIconMap[member.role];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-1 rounded-md flex items-center gap-x-2 w-full hover:bg-neutral-700/10 dark:hover:bg-neutral-700/50 transition mb-1",
        params?.memberId === member.id &&
          "bg-neutral-700/20 dark:bg-neutral-700"
      )}
    >
      <UserAvatar
        src={member.profile.imageUrl}
        className="h-8 w-8 md:h-8 md:w-8"
      />
      <p
        className={cn(
          "font-semibold text-xs text-neutral-500 group-hover:text-neutral-600 dark:text-neutral-400 dark:group-hover:text-neutral-300 transition",
          params?.memberId === member.id &&
            "text-primary dark:text-neutral-200 dark:group-hover:text-white"
        )}
      >
        {member.profile.name.replace("null", "")}
      </p>
      {icon}
    </button>
  );
};
