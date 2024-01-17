import { getChatServers } from "@/app/api/servers/get-chat-servers";
import { currentProfile } from "@/lib/current-profile";
import { ReactNode } from "react";
import { LayoutHeader } from "./_components/layout-header";
import { LayoutSideList } from "./_components/layout-side-list";

const Layout = async ({ children }: { children: ReactNode }) => {
  const [servers, profile] = await Promise.all([
    getChatServers(),
    currentProfile(),
  ]);

  const firstServerId = servers?.[0].id;

  return (
    <div className="h-[90%] w-[90%] flex flex-col rounded-lg border-[1.5px] border-neutral-300 shadow-lg">
      {!!profile && (
        <>
          {firstServerId && (
            <div className="h-[3rem] w-full border-b-[1.5px] border-neutral-300">
              <LayoutHeader servers={servers} defaultValue={firstServerId} />
            </div>
          )}
          <div className="h-[calc(100%-3rem)] flex flex-1">
            <div className="h-full w-56 border-r-[1.5px] border-neutral-300">
              <LayoutSideList profile={profile} />
            </div>
            <div className="h-full w-full flex justify-center items-center">
              {children}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
