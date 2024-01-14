import { getChatServers } from "@/app/api/servers/get-chat-servers";
import { CreateServerModal } from "../_components/initial-modal";

const ServerPage = async ({
  params: { serverId },
}: {
  params: { serverId: string };
}) => {
  const servers = await getChatServers();

  return (
    <div>
      {/* <CreateServerModal /> */}
      {servers.map((i) => (
        <div key={i.id}>{i.name}</div>
      ))}
    </div>
  );
};

export default ServerPage;
