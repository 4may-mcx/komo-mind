import { MusicMenubar } from "./_components/menu-bar";
import { MusicSideBar } from "./_components/side-bar";

const MusicPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] rounded-md border-[1px] border-neutral-300 shadow-md">
        <div className="w-full border-b-[1px] border-neutral-300">
          <MusicMenubar />
        </div>
        <div className="w-full flex">
          <div className="border-r-[1px] border-neutral-300">
            <MusicSideBar />
          </div>
          <div className="p-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MusicPageLayout;
