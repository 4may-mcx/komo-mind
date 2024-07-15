"use client";
import { PageLayout } from "@/components/page-layout";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";
import "highlight.js/styles/github.css";
import "github-markdown-css";
import { Textarea } from "@/components/ui/textarea";

const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).process(markdown);
  return result.toString();
};

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
  const [text, setText] = useState<string>("");
  const [html, setHtml] = useState<string>("");
  useEffect(() => {
    const getHtml = async () => {
      const result = await markdownToHtml(text);
      setHtml(result);
    };
    getHtml();
  }, [text]);

  return (
    <PageLayout title="MindMapPage" className="p-5 pb-20">
      <main className="w-full h-full">
        <ResizableLayout
          leftContent={
            <div className="p-2 h-full w-full">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="h-full w-full border-none resize-none dark:bg-[#1F1F1F] dark:text-white"
              />
            </div>
          }
          rightContent={
            <div
              className="markdown-body p-2 h-full w-full overflow-auto dark:bg-[#1F1F1F] dark:text-white"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          }
        />
      </main>
    </PageLayout>
  );
};

export default MindMapPage;
