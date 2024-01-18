import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChatHeader } from "../../_components/chat-header";
import { ChatInput } from "../../_components/chat-input";

const ChannelInfoPage = async ({
  params: { serverId, channelId },
}: {
  params: { serverId: string; channelId: string };
}) => {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();

  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) return redirect("/chat");

  return (
    <div className="h-full w-full flex flex-col dark:bg-[#313338]">
      <ChatHeader type="channel" name={channel.name} serverId={serverId} />
      <div className="flex-1">Future Message</div>
      <ChatInput
        type="channel"
        name={channel.name}
        apiUrl="/api/socket/messages"
        query={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
      />
    </div>
  );
};

export default ChannelInfoPage;
