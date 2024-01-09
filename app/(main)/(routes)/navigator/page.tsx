import { LinkCard } from "./_components/link-card";

const NavigatorPage = () => {
  const cards = [
    {
      title: "文档",
      content: "在线文档",
      url: "/documents",
    },
    {
      title: "权限",
      content: (
        <>
          <p>权限管理配置中心</p>
          <p>{"用户 -> 角色 -> 权限"}</p>
        </>
      ),
      url: "/permission",
    },
  ];
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-full flex flex-wrap items-center justify-center gap-x-4 gap-y-4">
        {cards.map((item) => (
          <LinkCard key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
};

export default NavigatorPage;
