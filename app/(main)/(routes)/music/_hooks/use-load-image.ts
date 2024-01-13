import { Song } from "@/data/stripe-types";

const useLoadImage = (song: Song) => {
  // const supabaseClient = useSupabaseClient();
  // if (!song) return null;

  // const { data } = supabaseClient.storage
  //   .from("images")
  //   .getPublicUrl(song.image_path);

  // return data.publicUrl;
  return "";
};

export default useLoadImage;
