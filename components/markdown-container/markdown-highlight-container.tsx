"use client";
import hljs from "highlight.js";
import { ReactNode, useEffect } from "react";

export const MarkdownHighlightContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  useEffect(() => {
    hljs.highlightAll();
  }, [children]);

  return <>{children}</>;
};
