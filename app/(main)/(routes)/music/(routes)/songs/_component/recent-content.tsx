"use client";

import { Song } from "@/data/stripe-types";
import Typography from "@/components/typography";
import { MusicCardItem } from "./music-card-item";
import useOnPlay from "../../../_hooks/use-on-play";
import MusicPlayer from "../../../_components/music-player";

export const RecentContent = ({ songs }: { songs: Song[] }) => {
  const onPlay = useOnPlay(songs);
  return (
    <div className="p-4 relative w-full h-full">
      <Typography.H4>Recent Music</Typography.H4>
      <div className="mt-4 flex flex-wrap">
        {songs?.map((item) => (
          <MusicCardItem
            key={item.id}
            song={item}
            onClick={(id) => onPlay(id)}
          />
        ))}
      </div>
      <MusicPlayer />
    </div>
  );
};
