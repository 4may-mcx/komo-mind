"use client";
import BaseTable from "@/components/base-table";
import { BaseTableColumnsType } from "@/components/base-table/types";
import { Button } from "@/components/ui/button";

interface UserManagementType {
  userName: string;
  root: boolean;
  email: string;
  phone: string;
}

const mockData = [
  {
    userName: "xmc",
    root: true,
    email: "1522928438@qq.com",
    phone: "1092381902",
  },
  {
    userName: "fhf",
    root: false,
    email: "1522928438@qq.com",
    phone: "1482381129",
  },
];

const columns: BaseTableColumnsType<UserManagementType>[] = [
  {
    title: "用户名",
    dataIndex: "userName",
    render: (userName, record) => (
      <>
        {userName}({record.phone})
      </>
    ),
  },
  {
    title: "超级管理员",
    dataIndex: "root",
    render: (root) => (root ? "是" : "否"),
  },
  {
    title: "邮箱",
    dataIndex: "email",
    render: (email) => <>{email}</>,
  },
  {
    title: "手机号",
    dataIndex: "phone",
    render: (phone) => <>{phone}</>,
  },
  {
    title: "操作",
    align: "center",
    render: () => (
      <>
        <Button variant="link">编辑</Button>
        <Button variant="link">清空权限</Button>
      </>
    ),
  },
];

export const UserManagementTable = () => {
  return (
    <BaseTable
      columns={columns}
      dataSource={mockData}
      rowKey={(record) => record.userName}
    />
  );
};
