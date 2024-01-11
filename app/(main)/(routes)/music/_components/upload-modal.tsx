"use client";

import CommonModal from "@/components/modals/common-modal";
import { useUploadModal } from "../_hooks/use-upload-modal";

export const UploadModal = () => {
  const { onClose, isOpen } = useUploadModal();

  return (
    <CommonModal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={isOpen}
      onCancel={onClose}
    >
      hello uploader
    </CommonModal>
  );
};
