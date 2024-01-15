import { redirect } from "next/navigation";

const ServerPage = ({
  params: { serverId },
}: {
  params: { serverId: string };
}) => {
  if (serverId === "invite") return redirect("/chat");
  return (
    <div>
      {/* <CreateServerModal /> */}
      active: {serverId}
    </div>
  );
};

export default ServerPage;
