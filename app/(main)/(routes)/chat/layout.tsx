import { getChatServers } from "@/app/api/servers/get-chat-servers";
import { ReactNode } from "react";
import { LayoutHeader } from "./_components/layout-header";
import { LayoutSideList } from "./_components/layout-side-list";
import { SearchServer } from "./_components/search-server";
import { currentProfile } from "@/lib/current-profile";

const Layout = async ({ children }: { children: ReactNode }) => {
  const [servers, profile] = await Promise.all([
    getChatServers(),
    currentProfile(),
  ]);

  const firstServerId = servers?.[0].id;

  return (
    <div className="h-[90%] w-[90%] flex flex-col rounded-lg border-[1px] border-neutral-300 shadow-lg">
      {!!profile && (
        <>
          {firstServerId && (
            <div className="h-[3rem] w-full border-b-[1px] border-neutral-300">
              <LayoutHeader servers={servers} defaultValue={firstServerId} />
            </div>
          )}
          <div className="h-[calc(100%-3rem)] flex flex-1">
            <div className="h-full w-52 border-r-[1px] border-neutral-300">
              <div className="h-[2.5rem] w-full">
                <SearchServer profile={profile} />
              </div>
              <div className="h-[calc(100%-2.5rem)] w-full">
                <LayoutSideList />
              </div>
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
