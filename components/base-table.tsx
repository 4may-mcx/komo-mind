import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface BaseTableColumnsType<T, K extends keyof T = any> {
  title: string;
  render: (data: K, record: T) => ReactNode | Element;
  align?: "left" | "center" | "right";
  width?: string;
  dataIndex?: keyof T;
}

export interface BaseTableProps<T = any, K extends keyof T = any> {
  rowKey: (record: T) => string;
  dataSource: T[];
  columns: BaseTableColumnsType<T, K>[];
  border?: boolean;
}

const BaseTable = ({ dataSource, columns, rowKey, border }: BaseTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map(({ align, width, title }, index) => (
            <TableHead
              style={{
                textAlign: align || "center",
                width,
              }}
              className={cn(border && "border", "p-1")}
              key={`${title}-${index}`}
            >
              {title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataSource.map((item) => {
          const _rowKey = rowKey(item);
          return (
            <TableRow key={_rowKey}>
              {columns.map(({ render, dataIndex, align, width }, index) => {
                const value = !!dataIndex ? item[dataIndex] : "";
                return (
                  <TableCell
                    key={`${_rowKey}-${index}`}
                    style={{ textAlign: align || "center", width }}
                    className={cn(border && "border", "p-1")}
                  >
                    {typeof render === "function" ? render(value, item) : value}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default BaseTable;
