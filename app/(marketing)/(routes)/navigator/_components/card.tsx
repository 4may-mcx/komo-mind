import Typography from "@/components/ui/typography";
import Link from "next/link";

export const LinkCard = ({
  title,
  content,
  url,
}: {
  title: string;
  content: string;
  url: string;
}) => {
  return (
    <Link href={url}>
      <div className=" w-52 h-32 p-4 rounded-md shadow-lg cursor-pointer hover:bg-neutral-100 bg-white hover:translate-y-[-3px] transition-transform dark:bg-neutral-700 dark:hover:bg-neutral-600">
        <Typography.H4>{title}</Typography.H4>
        <Typography.Muted className="mt-4">{content}</Typography.Muted>
      </div>
    </Link>
  );
};
