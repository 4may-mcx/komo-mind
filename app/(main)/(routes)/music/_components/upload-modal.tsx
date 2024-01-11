"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/ui/alert-dialog";
import { useUploadModal } from "../_hooks/use-upload-modal";

export const UploadModal = () => {
  const { onClose, isOpen } = useUploadModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <AlertDialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add a song</AlertDialogTitle>
          <AlertDialogDescription>Upload an mp3 file</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
          Cancel
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};
