import { cookies } from "next/headers";

export const getSongById = async (id: string): Promise<any> => {
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
