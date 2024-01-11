"use client";

import CommonModal from "@/components/modals/common-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/use-user";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import uniqid from "uniqid";
import { useUploadModal } from "../_hooks/use-upload-modal";
import { useRouter } from "next/navigation";

// todo:input form 换为 shadcn-ui
export const UploadModal = () => {
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const { onClose, isOpen } = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const handleModalClose = () => {
    onClose();
    reset();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }

      const uniqueID = uniqid();

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed image upload.");
      }

      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload.");
      }

      const { data: supabaseData, error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      handleModalClose();
      toast.success("Song Created!");
    } catch {
      toast.error("Upload failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CommonModal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={isOpen}
      onCancel={handleModalClose}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-y-4"
      >
        <Input
          id="title"
          disabled={isLoading}
          placeholder="Song title"
          {...register("title", { required: true })}
        />
        <Input
          id="author"
          disabled={isLoading}
          placeholder="Song author"
          {...register("author", { required: true })}
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          submit
        </Button>
      </form>
    </CommonModal>
  );
};
