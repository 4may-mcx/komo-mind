"use client";

import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Item } from "./item";

interface DocumentListProps {
  parentDocumentId?: number;
  level?: number;
  data?: any[];
}

export const DocumentList = ({
  parentDocumentId,
  level = 0,
}: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((preExpanded) => ({
      ...preExpanded,
      [documentId]: !preExpanded[documentId],
    }));
  };

  // const documents = useQuery(api.documents.getSidebar, {
  //   parentDocument: parentDocumentId,
  // });
  const documents = [] as any;

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }
  return (
    <div>
      {!!level && (
        <p
          style={{ paddingLeft: `${level * 12 + 25}px` }}
          className={cn(
            "hidden text-sm font-medium text-muted-foreground/80",
            expanded && "last:block",
            level === 0 && "hidden"
          )}
        >
          No pages inside
        </p>
      )}
      {documents.map((document: any) => {
        const { _id, icon, title } = document;
        return (
          <div key={_id}>
            <Item
              id={_id}
              onClick={() => onRedirect(_id)}
              label={title}
              level={level}
              icon={FileIcon}
              documentIcon={icon}
              active={params?.documentId === _id}
              onExpand={() => onExpand(_id)}
              expanded={expanded[_id]}
            />
            {expanded[_id] && (
              <DocumentList parentDocumentId={_id} level={level + 1} />
            )}
          </div>
        );
      })}
    </div>
  );
};
