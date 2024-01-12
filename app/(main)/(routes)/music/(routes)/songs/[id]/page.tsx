"use client";

import useLoadSongUrl from "../../../_hooks/use-load-songUrl";
import usePlayer from "../../../_hooks/use-player";
import useSongById from "../../../_hooks/use-song-by-id";

const SongPlayer = ({ params: { id } }: { params: { id: string } }) => {
  const { isLoading, song } = useSongById(id);
  const player = usePlayer();
  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !id) return null;

  return (
    <div className="h-full w-full flex justify-center items-center">
      songID: {id}
      {songUrl}
    </div>
  );
};

export default SongPlayer;
