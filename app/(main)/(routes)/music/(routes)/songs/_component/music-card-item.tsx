"use client";

import { Song } from "@/data/stripe-types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Typography from "@/components/typography";

const useLoadImage = (song: Song) => {
  const supabaseClient = useSupabaseClient();
  if (!song) return null;

  const { data } = supabaseClient.storage
    .from("images")
    .getPublicUrl(song.image_path);
  return data.publicUrl;
};

export const MusicCardItem = ({ song }: { song: Song }) => {
  const imagePath = useLoadImage(song);
  const pathName = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-col m-3">
      <div
        onClick={() => router.push(`${pathName}/${song.id}`)}
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
