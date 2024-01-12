"use client";

import { useParams } from "next/navigation";
const SongPlayer = () => {
  const { id } = useParams();
  return (
    <div className="h-full w-full flex justify-center items-center">
      {/* <audio src=".">11</audio> */}
      songID: {id}
    </div>
  );
};

export default SongPlayer;
