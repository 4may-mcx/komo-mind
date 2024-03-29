import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const useSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<any | undefined>(undefined);
  return { isLoading: false, song: {} as any };
  // useEffect(() => {
  //   if (!id) {
  //     return;
  //   }

  //   setIsLoading(true);

  //   const fetchSong = async () => {
  //     const { data, error } = await supabaseClient
  //       .from("songs")
  //       .select("*")
  //       .eq("id", id)
  //       .single();

  //     if (error) {
  //       setIsLoading(false);
  //       return toast.error(error.message);
  //     }

  //     setSong(data as Song);
  //     setIsLoading(false);
  //   };

  //   fetchSong();
  // }, [id, supabaseClient]);

  // return useMemo(
  //   () => ({
  //     isLoading,
  //     song,
  //   }),
  //   [isLoading, song]
  // );
};

export default useSongById;
