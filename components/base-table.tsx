import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

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
}

const BaseTable = ({ dataSource, columns, rowKey }: BaseTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map(({ align, width, title }, index) => (
            <TableHead
              style={{
                textAlign: align || "center",
                width: width,
              }}
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
                    style={{ textAlign: align || "center", width }}
                    key={`${_rowKey}-${index}`}
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
