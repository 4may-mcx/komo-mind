import { cookies } from "next/headers";

export const getSongs = async (): Promise<any[]> => {
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
