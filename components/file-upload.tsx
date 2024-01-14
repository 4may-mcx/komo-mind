"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

export const FileUpload = ({
  onChange,
  value,
  endpoint,
}: {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}) => {
  const fileType = value.split(".").pop();

  if (value && fileType !== "pdf")
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Uploaded file" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 rounded-full text-white p-1 absolute top-0 right-0 shadow-sm"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );

  return (
    <UploadDropzone
      className="bg-sky-300/90"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(err) => {
        console.log(err);
      }}
    />
  );
};
