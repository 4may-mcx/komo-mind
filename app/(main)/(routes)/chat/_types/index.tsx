import {
  Member,
  Profile,
  Server,
  MemberRole,
  ChannelType,
  Channel,
} from "@prisma/client";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { ReactNode } from "react";
export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
  channels: Channel[];
};

export const MemberRole2Label: Record<MemberRole, string> = {
  [MemberRole.ADMIN]: "管理员",
  [MemberRole.GUEST]: "访客",
  [MemberRole.MODERATOR]: "版主",
};

export const ChannelIconMap: Record<ChannelType, ReactNode> = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
};

export const RoleIconMap: Record<MemberRole, ReactNode | null> = {
  [MemberRole.GUEST]: null,
  [MemberRole.ADMIN]: <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />,
  [MemberRole.MODERATOR]: (
    <ShieldAlert className="mr-2 h-4 w-4 text-green-600" />
  ),
};
