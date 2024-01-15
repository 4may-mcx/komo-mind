"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { BaseTableColumnsType } from "./types";
import { MinusSquare, PlusSquare } from "lucide-react";

export const ExpandableRow = <T, K extends keyof T>({
  item,
  columns,
  rowKey,
  border,
  expandableRender,
}: {
  item: T;
  columns: BaseTableColumnsType<T, K>[];
  rowKey: (item: T) => string;
  border?: boolean;
  expandableRender?: (record: T) => ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const _rowKey = rowKey(item);
  return (
    <>
      <TableRow key={_rowKey}>
        {expandableRender && (
          <TableCell width={10}>
            <button onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? (
                <MinusSquare className="h-4 w-4" />
              ) : (
                <PlusSquare className="h-4 w-4" />
              )}
            </button>
          </TableCell>
        )}
        {columns.map(({ render, dataIndex, align, width }, index) => {
          const value = (!!dataIndex ? item[dataIndex] : "") as any;
          return (
            <TableCell
              key={`${_rowKey}-${index}`}
              style={{ textAlign: align || "left", width }}
              className={cn(border && "border", "p-1")}
            >
              {render?.(value, item) ?? value}
            </TableCell>
          );
        })}
      </TableRow>
      {isExpanded && expandableRender && (
        <TableRow>
          <TableCell colSpan={columns.length + 1}>
            {expandableRender(item)}
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
