import BaseTabs, { BaseTabType } from "@/components/base-tabs";
import { PageLayout } from "@/components/page-layout";

const options: BaseTabType[] = [
  {
    title: "按需加载container",
    render: <>1</>,
  },
  {
    title: "问卷配置方案",
    render: <>2</>,
  },
];

const PlaygroundPage = () => {
  return (
    <PageLayout
      title="2024-Playground"
      separator={<hr className="my-3" />}
      className="p-10 pt-5"
    >
      <BaseTabs options={options} />
    </PageLayout>
  );
};

export default PlaygroundPage;
