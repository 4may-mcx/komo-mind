import { cn } from "@/lib/utils";
import { getHtmlByMarkdownFilename } from "./utils";

export const MarkdownContainer = async ({
  filename,
  className,
}: {
  filename: string;
  className?: string;
}) => {
  const htmlContent = await getHtmlByMarkdownFilename(filename);

  return (
    <iframe
      srcDoc={htmlContent}
      className={cn("w-full h-full border-none", className)}
    />
  );
};
