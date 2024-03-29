import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const InvitePage = async ({
  params: { inviteCode },
}: {
  params: { inviteCode: string };
}) => {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  if (!inviteCode) return redirect("/chat");

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) return redirect(`/chat/${existingServer.id}`);

  const server = await db.server.update({
    where: {
      inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if (server) return redirect(`/chat/${server.id}`);

  return null;
};

export default InvitePage;
