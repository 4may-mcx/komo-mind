import { MusicMenubar } from "./_components/menu-bar";
import { MusicSideBar } from "./_components/side-bar";

const MusicPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="h-[90%] w-[90%] flex flex-col rounded-md border-[1px] border-neutral-300 shadow-md">
        <div className="h-[2.75rem] w-full border-b-[1px] border-neutral-300">
          <MusicMenubar />
        </div>
        <div style={{ height: "calc(100% - 2.75rem)" }} className="w-full flex">
          <div className="w-56 border-r-[1px] border-neutral-300 overflow-y-scroll">
            <MusicSideBar />
          </div>
          <div className="w-full h-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MusicPageLayout;
