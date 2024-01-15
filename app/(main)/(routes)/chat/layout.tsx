import { getChatServers } from "@/app/api/servers/get-chat-servers";
import { ReactNode } from "react";
import { LayoutHeader } from "./_components/layout-header";

const Layout = async ({ children }: { children: ReactNode }) => {
  const servers = await getChatServers();

  const firstServerId = servers[0].id;

  return (
    <div className="h-[90%] w-[90%] flex flex-col rounded-lg border-[1px] border-neutral-300 shadow-lg">
      <div className="w-full border-b-[1px] border-neutral-300">
        <LayoutHeader servers={servers} defaultValue={firstServerId} />
      </div>
      <div className="flex flex-grow">
        <div className="h-full w-52 border-r-[1px] border-neutral-300"></div>
        <div className="h-full w-full flex justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
