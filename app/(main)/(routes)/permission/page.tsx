import BaseTabs, { BaseTabType } from "@/components/base-tabs";
import { PageLayout } from "@/components/page-layout";
import { OperationManagementTable } from "./_components/operation-management";
import { ResourceManagementTable } from "./_components/resource-management";
import { UserManagementTable } from "./_components/user-management";

const options: BaseTabType[] = [
  {
    title: "用户管理",
    render: <UserManagementTable />,
  },
  {
    title: "资源管理",
    render: <ResourceManagementTable />,
  },
  {
    title: "操作管理",
    render: <OperationManagementTable />,
  },
  {
    title: "角色管理",
    render: <div>4444</div>,
  },
];

const PermissionPage = () => {
  return (
    <PageLayout title="权限管理" separator={<hr className="my-4" />}>
      <BaseTabs options={options} />
    </PageLayout>
  );
};

export default PermissionPage;
