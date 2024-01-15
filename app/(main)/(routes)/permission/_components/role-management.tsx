"use client";
import BaseTable from "@/components/base-table";
import { BaseTableColumnsType } from "@/components/base-table/types";
import { Button } from "@/components/ui/button";

interface RoleManagementType {
  id: string;
  name: string;
}

const mockData = [
  {
    id: "0001",
    name: "超级管理员",
  },
  {
    id: "0002",
    name: "开发者",
  },
];

const columns: BaseTableColumnsType<RoleManagementType>[] = [
  {
    title: "角色ID",
    dataIndex: "id",
  },
  {
    title: "角色名称",
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

export const RoleManagement = () => {
  return (
    <BaseTable
      columns={columns}
      dataSource={mockData}
      rowKey={(record) => record.id}
      expandableRender={(record) => <>{JSON.stringify(record)}</>}
    />
  );
};
