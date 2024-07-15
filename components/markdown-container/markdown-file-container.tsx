import "github-markdown-css";
import "highlight.js/styles/github.css";
import { MarkdownHighlightContainer } from "./markdown-highlight-container";
import { MarkdownFileDisplay } from "./markdown-file-display";

export const MarkdownFileContainer = ({
  filename,
  className,
}: {
  filename: string;
  className?: string;
}) => {
  const _filename = filename.endsWith(".md") ? filename : `${filename}.md`;

  return (
    <MarkdownHighlightContainer>
      <MarkdownFileDisplay filename={_filename} className={className} />
    </MarkdownHighlightContainer>
  );
};
