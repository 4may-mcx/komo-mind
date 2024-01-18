import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";

export const UserAvatar = ({
  src,
  className,
}: {
  src: string;
  className?: string;
}) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarFallback className="text-neutral-500 dark:text-neutral-400">CN</AvatarFallback>
      <AvatarImage src={src} />
    </Avatar>
  );
};
