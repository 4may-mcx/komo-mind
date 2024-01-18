"use client";

import { ActionTooltip } from "@/components/action-tooltip";
import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DeleteChannelModal } from "./modals/delete-channel-modal";
import { EditChannelModal } from "./modals/edit-channel-modal";

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
        "w-full group px-2 py-1.5 rounded-md flex items-center gap-x-2 hover:bg-neutral-700/10 dark:hover:bg-neutral-700/50 transition mb-1",
        params?.channelId === channel.id &&
          "bg-neutral-700/20 dark:bg-neutral-700"
      )}
    >
      <Icon className="flex-shrink-0 w-[1.1rem] h-[1.1rem] text-neutral-500 dark:text-neutral-400" />
      <p
        className={cn(
          "truncate font-semibold text-sm text-neutral-600 dark:text-neutral-300 transition",
          params?.channelId === channel.id &&
            "text-primary dark:text-neutral-200 dark:group-hover:text-white"
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <EditChannelModal
            channel={channel}
            triggerNode={(show) => (
              <ActionTooltip label="编辑">
                <Edit
                  onClick={(e) => {
                    e.stopPropagation();
                    show();
                  }}
                  className="hidden group-hover:block w-4 h-4 text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition"
                />
              </ActionTooltip>
            )}
          />
          <DeleteChannelModal
            channel={channel}
            triggerNode={(show) => (
              <ActionTooltip label="删除">
                <Trash
                  onClick={(e) => {
                    e.stopPropagation();
                    show();
                  }}
                  className="hidden group-hover:block w-4 h-4 text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition"
                />
              </ActionTooltip>
            )}
          />
        </div>
      )}
      {channel.name === "general" && (
        <Lock className="ml-auto w-4 h-4 text-neutral-500 dark:text-neutral-400" />
      )}
    </button>
  );
};
