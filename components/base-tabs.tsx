import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface BaseTabType {
  title: string;
  render: React.ReactNode;
}

const BaseTabs = ({
  defaultActiveTab,
  options,
}: {
  defaultActiveTab?: string;
  options: BaseTabType[];
}) => {
  const _activeTab = defaultActiveTab || options[0].title;
  return (
    <Tabs defaultValue={_activeTab} className="w-full">
      <TabsList>
        {options.map(({ title }) => (
          <TabsTrigger value={title} key={`_tab_title_${title}`}>
            {title}
          </TabsTrigger>
        ))}
      </TabsList>
      {options.map(({ title, render }) => (
        <TabsContent value={title} key={`_tab_content_${title}`}>
          {render}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default BaseTabs;
