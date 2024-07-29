"use client";
import { PageLayout } from "@/components/page-layout";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const ResizableLayout = ({
  leftContent,
  rightContent,
}: {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full rounded-lg border dark:border-neutral-200"
    >
      <ResizablePanel defaultSize={50}>{leftContent}</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>{rightContent}</ResizablePanel>
    </ResizablePanelGroup>
  );
};

const MindMapPage = () => {
  return (
    <PageLayout className="p-5 pb-10">
      <main className="w-full h-full">
        <ResizableLayout
          leftContent={
            <div className="p-2 h-full w-full">
              <>22</>
            </div>
          }
          rightContent={<>11</>}
        />
      </main>
    </PageLayout>
  );
};

export default MindMapPage;
