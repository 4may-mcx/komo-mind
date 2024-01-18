"use client";

import { ActionTooltip } from "@/components/action-tooltip";
import { ChannelType, MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";
import { ServerWithMembersWithProfiles } from "../_types";
import { CreateChannelModal } from "./create-channel-modal";
import { ManageMemberModal } from "./manage-member-modal";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}

export const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) => {
  return (
    <div className="flex items-center justify-between py-1">
      <p className="text-xs uppercase font-semibold text-neutral-500 dark:text-neutral-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <CreateChannelModal
          defaultType={channelType}
          triggerNode={(show) => (
            <ActionTooltip label="创建频道" side="top">
              <button
                onClick={show}
                className="text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition"
              >
                <Plus className="h-4 w-4" />
              </button>
            </ActionTooltip>
          )}
        />
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ManageMemberModal
          triggerNode={(show) => (
            <ActionTooltip label="管理成员" side="top">
              <button
                onClick={show}
                className="text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition"
              >
                <Settings className="h-4 w-4" />
              </button>
            </ActionTooltip>
          )}
        />
      )}
    </div>
  );
};
