"use client";

import Typography from "@/components/typography";
import { Song } from "@/data/stripe-types";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import useLoadImage from "../../../_hooks/use-load-image";

export const MusicCardItem = ({
  song,
  onClick,
}: {
  song: Song;
  onClick: (id: string) => void;
}) => {
  const imagePath = useLoadImage(song);
  const pathName = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-col m-3">
      <div
        onClick={() => onClick(song.id)}
        // onClick={() => router.push(`${pathName}/${song.id}`)}
        className="h-36 w-32 flex items-center justify-center border-[1px] border-neutral-300 rounded-lg cursor-pointer overflow-hidden"
      >
        <Image
          className="transition-transform duration-300 ease-in-out transform hover:scale-110"
          width={128}
          height={144}
          src={imagePath || ""}
          alt={song.title}
        />
      </div>
      <div>
        <Typography.Small>{song.title}</Typography.Small>
        <Typography.Muted>{song.author}</Typography.Muted>
      </div>
    </div>
  );
};
