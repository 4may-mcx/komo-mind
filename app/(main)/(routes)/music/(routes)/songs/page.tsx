"use client";

import Typography from "@/components/typography";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useUser } from "@/hooks/use-user";
import { ListMusic, PlusSquare } from "lucide-react";

const SongsPage = () => {
  const { user } = useUser();
  const { onOpen } = useAuthModal();

  const handleAdd = () => {
    if (!user) {
      onOpen();
    }
  };
  return (
    <div className="h-full w-full max-h-full flex">
      <div className="h-full w-52 flex flex-col border-r-[1px] border-neutral-300">
        <div className="w-full flex items-center justify-between p-2">
          <div>
            <ListMusic className="h-4 w-4 mr-2 inline-block" />
            <Typography.Small>Your Library</Typography.Small>
          </div>
          <PlusSquare
            onClick={handleAdd}
            className="h-4 w-4 cursor-pointer hover:h-6 hover:w-6 hover:translate-x-1 duration-500"
          />
        </div>
        <div className="h-full w-full p-2 gap-y-2 rounded-[inherit] flex-grow overflow-y-scroll scroll-m-1"></div>
      </div>
      <div className="p-4">songs</div>
    </div>
  );
};

export default SongsPage;
