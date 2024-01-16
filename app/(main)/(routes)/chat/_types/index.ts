import { Member, Profile, Server, MemberRole } from "@prisma/client";

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

export const MemberRole2Label: Record<MemberRole, string> = {
  [MemberRole.ADMIN]: "管理员",
  [MemberRole.GUEST]: "访客",
  [MemberRole.MODERATOR]: "版主",
};
