"use client";

import useLoadSongUrl from "../_hooks/use-load-songUrl";
import usePlayer from "../_hooks/use-player";
import useSongById from "../_hooks/use-song-by-id";

const MusicPlayer = () => {
  const { activeId } = usePlayer();
  const { isLoading, song } = useSongById(activeId);
  const player = usePlayer();
  const songUrl = useLoadSongUrl(song!);

  if (!activeId) return null;
  const _isLoading = isLoading || !song || !songUrl;

  return (
    <div className="absolute w-full left-0 bottom-0 p-2 flex items-center justify-center border-t-[1px] border-neutral-300">
      {_isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          songActiveId: {activeId}
          {songUrl}
        </>
      )}
    </div>
  );
};

export default MusicPlayer;
