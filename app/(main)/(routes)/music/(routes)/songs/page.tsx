import { getSongs } from "../../action/get-songs";
import { LibraryHeader } from "./_component/library-header";
import { LibraryList } from "./_component/library-list";
import { RecentContent } from "./_component/recent-content";

const SongsPage = async () => {
  const songs = await getSongs();
  return (
    <div className="h-full w-full max-h-full flex">
      <div className="h-full w-52 flex flex-col border-r-[1px] border-neutral-300">
        <LibraryHeader />
        <LibraryList songs={songs} />
      </div>
      <RecentContent songs={songs} />
    </div>
  );
};

export default SongsPage;
