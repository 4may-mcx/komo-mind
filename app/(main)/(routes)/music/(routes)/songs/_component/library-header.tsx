"use client";

import Typography from "@/components/typography";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useUser } from "@/hooks/use-user";
import { ListMusic, PlusSquare } from "lucide-react";
import { useUploadModal } from "../../../_hooks/use-upload-modal";
import { UploadModal } from "../../../_components/upload-modal";

export const LibraryHeader = () => {
  const { user } = useUser();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();

  const handleAdd = () => {
    if (!user) return authModal.onOpen();

    return uploadModal.onOpen();
  };
  return (
    <div className="w-full flex items-center justify-between p-2">
      <div>
        <ListMusic className="h-4 w-4 mr-2 inline-block" />
        <Typography.Small>Your Library</Typography.Small>
      </div>
      <PlusSquare
        onClick={handleAdd}
        className="h-4 w-4 cursor-pointer hover:animate-bounce"
      />
      <UploadModal />
    </div>
  );
};
