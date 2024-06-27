import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

// 文件位于项目根目录的 /markdown 文件夹中
const markdownDirectory = path.join(process.cwd(), "markdown");

const getMarkdownSource = async (filename: string) => {
  // 构造文件的完全路径
  const fullPath = path.join(markdownDirectory, filename);
  // 异步读取文件内容
  const content = await fs.promises.readFile(fullPath, "utf8");
  return content;
};

const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).process(markdown);
  return result.toString();
};

export const getHtmlByMarkdownFilename = async (filename: string) => {
  const markdown = await getMarkdownSource(filename);
  const htmlContent = await markdownToHtml(markdown);
  return htmlContent;
};
