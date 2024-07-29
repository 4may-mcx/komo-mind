import Typography from "@/components/typography";
import { cn } from "@/lib/utils";
export const PageLayout = ({
  children,
  separator,
  title,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  separator?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("h-full w-full dark:bg-[#1F1F1F] p-20", className)}>
      {title && (
        <>
          <header>
            <Typography.H3>{title}</Typography.H3>
          </header>
          {separator}
        </>
      )}
      <main
        className={cn(
          "w-full h-full flex overflow-y-auto",
          !separator && "mt-4"
        )}
      >
        {children}
      </main>
    </div>
  );
};
