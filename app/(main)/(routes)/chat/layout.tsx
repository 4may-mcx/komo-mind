import { getChatServers } from "@/app/api/servers/get-chat-servers";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { ServerSelect } from "./_components/server-select";

const Layout = async ({ children }: { children: ReactNode }) => {
  const servers = await getChatServers();

  const firstServerId = servers[0].id;

  return (
    <div className="h-[90%] w-[90%] flex rounded-lg border-[1px] border-neutral-300 shadow-lg">
      <div className="h-full w-44 border-r-[1px] border-neutral-300">
        <div className="p-1 flex w-44 items-center justify-center border-b-[1px] border-neutral-300">
          <ServerSelect servers={servers} value={firstServerId} />
        </div>
      </div>
      <div className="h-full w-full flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default Layout;
