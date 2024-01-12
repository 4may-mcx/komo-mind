import BaseTable, { BaseTableColumnsType } from "@/components/base-table";
import { Button } from "@/components/ui/button";

interface ResourceManagementType {
  key: string;
  name: string;
}

const mockData = [
  {
    key: "1V1_LIVE_CLASS_LIST",
    name: "直播-视频 1V1",
  },
  {
    key: "ACADEMIC_MANAGEMENT",
    name: "教务-学期-排班相关操作",
  },
];

const columns: BaseTableColumnsType<ResourceManagementType>[] = [
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

export const ResourceManagementTable = () => {
  return (
    <BaseTable
      columns={columns}
      dataSource={mockData}
      rowKey={(record) => record.key}
    />
  );
};
