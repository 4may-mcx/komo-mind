"use client";

import { ActionTooltip } from "@/components/action-tooltip";
import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

export const ServerChannel = ({
  channel,
  server,
  role,
}: ServerChannelProps) => {
  const params = useParams();
  const router = useRouter();

  const Icon = iconMap[channel.type];

  const onClick = () => {
    router.push(`/chat/${params?.serverId}/channels/${channel.id}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-1.5 rounded-md flex items-center gap-x-2 w-full hover:bg-neutral-700/10 dark:hover:bg-neutral-700/50 transition mb-1",
        params?.channelId === channel.id && "bg-neutral-700/20 dark:bg-neutral-700"
      )}
    >
      <Icon className="flex-shrink-0 w-4 h-4 text-neutral-500 dark:text-neutral-400" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-xs text-neutral-500 group-hover:text-neutral-600 dark:text-neutral-400 dark:group-hover:text-neutral-300 transition",
          params?.channelId === channel.id &&
            "text-primary dark:text-neutral-200 dark:group-hover:text-white"
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="编辑">
            <Edit className="hidden group-hover:block w-4 h-4 text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition" />
          </ActionTooltip>
          <ActionTooltip label="删除">
            <Trash className="hidden group-hover:block w-4 h-4 text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition" />
          </ActionTooltip>
        </div>
      )}
      {channel.name === "general" && (
        <Lock className="ml-auto w-4 h-4 text-neutral-500 dark:text-neutral-400" />
      )}
    </button>
  );
};
