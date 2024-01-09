import { LinkCard } from "./_components/card";
const Navigator = () => {
  const cards = [
    {
      title: "文档",
      content: "在线文档",
      url: "documents",
    },
    {
      title: "权限",
      content: "权限管理配置中心",
      url: "control",
    },
  ];
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-full flex flex-wrap items-center justify-center gap-x-4 gap-y-4">
        {cards.map((card) => (
          <LinkCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Navigator;
