import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import { CreateServerModal } from "./_components/initial-modal";

const ChatPage = async () => {
  const profile = await initialProfile();

  // 默认进入第一个server，找不到就创建
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) return redirect(`chat/${server.id}`);

  return <CreateServerModal />;
};

export default ChatPage;
