import BaseTable, { BaseTableColumnsType } from "@/components/base-table";

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
    width: "50px",
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
  return (
    <BaseTable
      columns={columns}
      dataSource={mockData}
      rowKey={(record) => record.userName}
    />
  );
};
