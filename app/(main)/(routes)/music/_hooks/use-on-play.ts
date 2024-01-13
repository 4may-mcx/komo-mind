import { Song } from "@/data/stripe-types";
import usePlayer from "./use-player";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  return () => {};
  // const authModal = useAuthModal();
  // const { user } = useUser();

  // const onPlay = (id: string) => {
  //   if (!user) {
  //     return authModal.onOpen();
  //   }

  //   player.setId(id);
  //   player.setIds(songs.map((song) => song.id));
  // };

  // return onPlay;
};

export default useOnPlay;
