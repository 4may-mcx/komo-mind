import { Song } from "@/data/stripe-types";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useUser } from "@/hooks/use-user";
import usePlayer from "./use-player";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
