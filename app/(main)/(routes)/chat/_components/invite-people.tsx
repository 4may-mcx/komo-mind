import { Tooltip } from "@/components/ui/tooltip";
import { UserPlus } from "lucide-react";

export const InvitePeopleButton = () => {
  return (
    <Tooltip content="邀请你的朋友">
      <UserPlus className="h-4 w-4 mx-1 hover:animate-bounce cursor-pointer" />
    </Tooltip>
  );
};
