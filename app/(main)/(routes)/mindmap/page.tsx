"use client";
import { PageLayout } from "@/components/page-layout";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { remark } from "remark";
import html from "remark-html";
import MindMapContent from "./_components/mindmap-content";

import "github-markdown-css";
import "highlight.js/styles/github.css";

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

const TextEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault(); // 阻止默认的切换行为

      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;

      // 设置文本值
      const newValue =
        value.substring(0, start) + "    " + value.substring(end);
      onChange(newValue);

      // 在 DOM 操作完成后设置光标位置
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart =
            textareaRef.current.selectionEnd = start + 4;
        }
      });
    }
  };

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-full w-full border-none resize-none dark:bg-[#1F1F1F] dark:text-white"
      onKeyDown={handleKeyDown}
    />
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
    <PageLayout className="p-5 pb-10">
      <main className="w-full h-full">
        <ResizableLayout
          leftContent={
            <div className="p-2 h-full w-full">
              <TextEditor value={text} onChange={setText} />
            </div>
          }
          rightContent={
            // <MarkdownHighlightContainer>
            //   <div
            //     className="markdown-body p-2 h-full w-full overflow-auto dark:bg-[#1F1F1F] dark:text-white"
            //     dangerouslySetInnerHTML={{ __html: html }}
            //   />
            // </MarkdownHighlightContainer>
            <MindMapContent />
          }
        />
      </main>
    </PageLayout>
  );
};

export default MindMapPage;
