import "github-markdown-css";
import "highlight.js/styles/github.css";
import { MarkdownHighlightContainer } from "./markdown-highlight-container";
import { MarkdownDisplay } from "./markdown-display";

export const MarkdownContainer = ({
  filename,
  className,
}: {
  filename: string;
  className?: string;
}) => {
  const _filename = filename.endsWith(".md") ? filename : `${filename}.md`;

  return (
    <MarkdownHighlightContainer>
      <MarkdownDisplay filename={_filename} className={className} />
    </MarkdownHighlightContainer>
  );
};
