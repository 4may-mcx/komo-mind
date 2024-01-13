import { cookies } from "next/headers";
import { Song } from "@/data/stripe-types";

export const getSongById = async (id: string): Promise<Song> => {
  return await Promise.resolve({ songUrl: "11" } as any);
  // const supabase = createServerComponentClient({
  //   cookies: cookies,
  // });

  // const { data, error } = await supabase
  //   .from("songs")
  //   .select("*")
  //   .eq("id", id)
  //   .single();

  // if (error) {
  //   console.log(error.message);
  // }

  // return data || [];
};
