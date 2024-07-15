import { getHtmlByMarkdownFilename } from "./utils";

import "highlight.js/styles/github.css";
import "github-markdown-css";

export const MarkdownFileDisplay = async ({
  filename,
  className,
}: {
  filename: string;
  className?: string;
}) => {
  const htmlContent = await getHtmlByMarkdownFilename(filename);

  return (
    <div
      className={`markdown-body ${className || ""}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};
