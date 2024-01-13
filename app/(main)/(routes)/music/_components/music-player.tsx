"use client";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  LucideIcon,
  Pause,
  Play,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useState } from "react";
import useLoadSongUrl from "../_hooks/use-load-songUrl";
import usePlayer from "../_hooks/use-player";
import useSongById from "../_hooks/use-song-by-id";

const PlayerControlItem = ({
  onClick,
  Icon,
  className,
}: {
  onClick: () => void;
  Icon: LucideIcon;
  className?: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={"h-6 w-6 cursor-pointer flex justify-center items-center"}
    >
      <Icon
        className={cn(
          "text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white transition-all duration-200",
          className
        )}
      />
    </div>
  );
};

const getVolumeIcon = (volume: number) => {
  if (volume === 0) return VolumeX;
  if (volume >= 70) return Volume2;
  if (volume >= 30) return Volume1;
  return Volume;
};

const PlayerContent = ({ song, songUrl }: { song: any; songUrl: string }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSongIndex = player.ids.findIndex((id) => id === player.activeId);

  const onPlayNext = () => {
    if (player.ids.length === 0) return;
    const nextSong = player.ids[currentSongIndex + 1];

    player.setId(nextSong || player.ids[0]);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) return;
    const prevSong = player.ids[currentSongIndex - 1];

    player.setId(prevSong || player.ids[player.ids.length - 1]);
  };

  const handlePlay = () =>
    isPlaying ? setIsPlaying(false) : setIsPlaying(true);

  const toggleMute = () => (volume > 0 ? setVolume(0) : setVolume(100));

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="mx-10 flex flex-grow">
        <audio controls src={songUrl} className="scale-90" />
      </div>
      <div className="gap-x-6 flex justify-center items-center">
        <PlayerControlItem onClick={onPlayPrevious} Icon={ArrowLeftToLine} />
        <PlayerControlItem
          onClick={handlePlay}
          Icon={isPlaying ? Pause : Play}
        />
        <PlayerControlItem onClick={onPlayNext} Icon={ArrowRightToLine} />
      </div>
      <div className="flex h-full mx-10 gap-x-2">
        <PlayerControlItem
          className="h-5 w-5"
          onClick={toggleMute}
          Icon={getVolumeIcon(volume)}
        />
        <Slider
          className="w-20"
          value={[volume]}
          max={100}
          step={1}
          onValueChange={(v) => setVolume(v[0])}
        />
      </div>
    </div>
  );
};

const MusicPlayer = () => {
  const { activeId } = usePlayer();
  const { isLoading, song } = useSongById(activeId);
  const player = usePlayer();
  const songUrl = useLoadSongUrl(song!);

  if (!activeId) return null;
  const _isLoading = isLoading || !songUrl;

  return (
    <div className="absolute w-full left-0 bottom-0 p-2 flex items-center justify-center border-t-[1px] border-neutral-300">
      {_isLoading ? (
        <div>loading...</div>
      ) : (
        <PlayerContent key={songUrl} song={song!} songUrl={songUrl} />
      )}
    </div>
  );
};

export default MusicPlayer;
