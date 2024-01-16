import { ServerWithMembersWithProfiles } from "@/app/(main)/(routes)/chat/_types";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const getChatServers = async () => {
  const profile = await currentProfile();
  if (!profile) return redirect("/");

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      members: {
        include: {
          profile: true,
        },
      },
      channels: true,
    },
  });
  return servers as unknown as ServerWithMembersWithProfiles[];
};
