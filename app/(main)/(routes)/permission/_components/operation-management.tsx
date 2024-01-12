import BaseTable, { BaseTableColumnsType } from "@/components/base-table";
import { Button } from "@/components/ui/button";

interface OperationManagementType {
  key: string;
  name: string;
}

const mockData = [
  {
    key: "CREATE",
    name: "创建",
  },
  {
    key: "DELETE",
    name: "删除",
  },
  {
    key: "UPDATE",
    name: "编辑",
  },
  {
    key: "READ",
    name: "查看",
  },
];

const columns: BaseTableColumnsType<OperationManagementType>[] = [
  {
    title: "KEY",
    dataIndex: "key",
  },
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "操作",
    align: "center",
    render: () => (
      <>
        <Button variant="link">编辑</Button>
        <Button variant="link">删除</Button>
      </>
    ),
  },
];

export const OperationManagementTable = () => {
  return (
    <BaseTable
      columns={columns}
      dataSource={mockData}
      rowKey={(record) => record.key}
    />
  );
};
