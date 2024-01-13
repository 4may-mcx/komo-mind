import { cookies } from "next/headers";

import { Song } from "@/data/stripe-types";

export const getSongs = async (): Promise<Song[]> => {
  return [];
  // const supabase = createServerComponentClient({
  //   cookies: cookies,
  // });

  // const { data, error } = await supabase
  //   .from("songs")
  //   .select("*")
  //   .order("created_at", { ascending: false });

  // if (error) {
  //   console.log(error.message);
  // }

  // return data || [];
};
