"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

const DocumentsPage = () => {
  // const { user } = useUser();
  // const create = useMutation(api.documents.create);

  // const onCreate = () => {
  //   const promise = create({ title: "Untitled" });

  //   toast.promise(promise, {
  //     loading: "Creating a new note...",
  //     success: "Created successfully!",
  //     error: "Failed to create new note.",
  //   });
  // };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        height="300"
        width="300"
        alt="empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">{`Welcome to todo's mind`}</h2>
      <Button onClick={() => {}}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
