import BaseTable, { BaseTableColumnsType } from "@/components/base-table";
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
];

export const UserManagementTable = () => {
  const _columns = [
    ...columns,
    {
      title: "操作",
      render: () => (
        <>
          <Button variant="ghost">编辑</Button>
          <Button variant="ghost">清空权限</Button>
        </>
      ),
    },
  ];
  return (
    <BaseTable
      columns={_columns}
      dataSource={mockData}
      rowKey={(record) => record.userName}
    />
  );
};
