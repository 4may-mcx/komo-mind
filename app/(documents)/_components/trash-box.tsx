"use client";

import { Input } from "@/components/ui/input";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmModal } from "../../../components/modals/confirm-modal";

export const TrashBox = () => {
  const router = useRouter();
  const params = useParams();

  const [search, setSearch] = useState("");

  // if (documents === undefined) {
  //   return (
  //     <div className="h-full flex items-center justify-center p-4">
  //       <Spinner size="lg" />
  //     </div>
  //   );
  // }

  const filterDocuments = [] as any;
  // const filterDocuments = documents?.filter((document) => {
  //   return document.title
  //     .toLocaleLowerCase()
  //     .includes(search.toLocaleLowerCase());
  // });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (a: any, b: any) => {};
  // const onRestore = (
  //   e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  //   documentId: Id<"documents">
  // ) => {
  //   e.stopPropagation();
  //   const promise = restore({ id: documentId });

  //   toast.promise(promise, {
  //     loading: "Restoring note...",
  //     success: "Note restored!",
  //     error: "Failed to restore note",
  //   });
  // };

  const onRemove = (a: any) => {};
  // const onRemove = (documentId: Id<"documents">) => {
  //   const promise = remove({ id: documentId });

  //   toast.promise(promise, {
  //     loading: "Deleting note...",
  //     success: "Note deleted!",
  //     error: "Failed to delete note",
  //   });

  //   if (params.documentId === documentId) {
  //     router.push("/documents");
  //   }
  // };
  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found.
        </p>
        {filterDocuments?.map((document: any) => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => onRestore(e, document._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  onClick={(e) => e.stopPropagation()}
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
