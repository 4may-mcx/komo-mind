import Typography from "@/components/typography";
import { cn } from "@/lib/utils";
export const PageLayout = ({
  children,
  separator,
  title,
}: {
  title: string;
  children: React.ReactNode;
  separator?: React.ReactNode;
}) => {
  return (
    <div className="h-full w-full dark:bg-[#1F1F1F] p-20">
      <header>
        <Typography.H3>{title}</Typography.H3>
      </header>
      {separator}
      <main
        className={cn(
          "w-full h-full flex overflow-y-auto",
          !separator && "mt-8"
        )}
      >
        {children}
      </main>
    </div>
  );
};
