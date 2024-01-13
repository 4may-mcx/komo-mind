"use client";

import { Song } from "@/data/stripe-types";
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
import useLoadSongUrl from "../_hooks/use-load-songUrl";
import usePlayer from "../_hooks/use-player";
import useSongById from "../_hooks/use-song-by-id";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

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

const PlayerContent = ({ song, songUrl }: { song: Song; songUrl: string }) => {
  const [volume, setVolume] = useState<number>(0);
  const Icon = false ? Pause : Play;
  const VolumeIcon = getVolumeIcon(volume);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="gap-x-6 flex justify-center items-center">
        <PlayerControlItem onClick={() => {}} Icon={ArrowLeftToLine} />
        <PlayerControlItem onClick={() => {}} Icon={Icon} />
        <PlayerControlItem onClick={() => {}} Icon={ArrowRightToLine} />
      </div>
      <div className="flex h-full ml-10 gap-x-2">
        <PlayerControlItem
          className="h-5 w-5"
          onClick={() => {
            volume > 0 ? setVolume(0) : setVolume(100);
          }}
          Icon={VolumeIcon}
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
