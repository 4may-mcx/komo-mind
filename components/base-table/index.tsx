"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ExpandableRow } from "./expendable-row";
import { BaseTableColumnsType } from "./types";

export interface BaseTableProps<T, K extends keyof T> {
  rowKey: (record: T) => string;
  dataSource: T[];
  columns: BaseTableColumnsType<T, K>[];
  border?: boolean;
  expandableRender?: (record: T) => ReactNode;
  hideHeader?: boolean;
}

const BaseTable = <T, K extends keyof T>({
  dataSource,
  columns,
  rowKey,
  border,
  expandableRender,
  hideHeader,
}: BaseTableProps<T, K>) => {
  return (
    <Table>
      <TableHeader className={cn(hideHeader && "hidden")}>
        <TableRow>
          {!!expandableRender && <TableHead className="absolute" />}
          {columns.map(({ align, width, title }, index) => (
            <TableHead
              className={cn(border && "border", "p-1")}
              style={{
                textAlign: align || "left",
                width,
              }}
              key={`${title}-${index}`}
            >
              {title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataSource.map((item) => (
          <ExpandableRow
            key={rowKey(item)}
            item={item}
            columns={columns}
            rowKey={rowKey}
            border={border}
            expandableRender={expandableRender}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default BaseTable;
