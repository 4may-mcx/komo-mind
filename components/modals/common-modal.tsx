"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/ui/alert-dialog";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface CommonModalProps {
  title: string;
  isOpen: boolean;
  description?: string;
  onOk?: () => void;
  onCancel?: () => void;
  children?: ReactNode;
  footer?: ReactNode;
}

const CommonModal = ({
  isOpen,
  title,
  description,
  onOk,
  onCancel,
  children,
  footer,
}: CommonModalProps) => {
  const onChange = (open: boolean) => {
    open ? onOk?.() : onCancel?.();
  };

  return (
    <AlertDialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-between">
            <AlertDialogTitle>{title}</AlertDialogTitle>
            {!!onCancel && (
              <X
                className="cursor-pointer hover:animate-bounce"
                onClick={onCancel}
              />
            )}
          </div>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>{footer}</AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CommonModal;
