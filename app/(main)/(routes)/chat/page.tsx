import { getChatServers } from "@/app/api/servers/get-chat-servers";
import { redirect } from "next/navigation";
import { ButtonWithCreateServerModal } from "./_components/create-server-modal";

const ChatPage = async () => {
  const servers = await getChatServers();

  const firstServerId = servers?.[0].id;

  if (firstServerId) return redirect(`chat/${firstServerId}`);

  return <ButtonWithCreateServerModal />;
};

export default ChatPage;
