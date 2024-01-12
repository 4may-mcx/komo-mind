import { Song } from "@/data/stripe-types";
import Typography from "@/components/typography";
import { MusicCardItem } from "./music-card-item";

export const RecentContent = ({ songs }: { songs: Song[] }) => {
  return (
    <div className="p-4">
      <Typography.H4>Recent Music</Typography.H4>
      <div className="mt-4 flex flex-wrap">
        {songs?.map((item) => (
          <MusicCardItem key={item.id} song={item} />
        ))}
      </div>
    </div>
  );
};
