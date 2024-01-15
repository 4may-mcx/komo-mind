"use client";
import { Button } from "@/components/ui/button";
import { Server } from "@prisma/client";
import { Boxes, LucideIcon, Settings, UserPlus } from "lucide-react";
import { ReactNode } from "react";
import { ServerSelect } from "./server-select";
import { CreateServerModal } from "./create-server-modal";

const BaseButton = ({
  icon: Icon,
  children,
  onClick,
}: {
  icon: LucideIcon;
  children: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="h-7 border-dashed border-[1px] border-neutral-300 gap-x-2 p-2"
    >
      <Icon className="h-[0.9rem] w-[0.9rem]" />
      <span className="text-sm">{children}</span>
    </Button>
  );
};

export const LayoutHeader = ({
  servers,
  defaultValue,
}: {
  servers: Server[];
  defaultValue: string;
}) => {
  return (
    <div className="p-2 w-full flex items-center gap-x-4">
      <div className="w-40">
        <ServerSelect servers={servers} defaultValue={defaultValue} />
      </div>
      <CreateServerModal
        triggerNode={(show) => (
          <BaseButton onClick={show} icon={Boxes}>
            add
          </BaseButton>
        )}
      />
      <BaseButton icon={Settings}>edit</BaseButton>
      <BaseButton icon={UserPlus}>invite</BaseButton>
    </div>
  );
};
