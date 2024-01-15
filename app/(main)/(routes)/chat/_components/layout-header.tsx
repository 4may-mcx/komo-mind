"use client";
import { Button } from "@/components/ui/button";
import { Server } from "@prisma/client";
import { Boxes, LucideIcon, Settings, UserPlus } from "lucide-react";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useServerStore } from "../_hook/use-server-store";
import { CreateServerModal } from "./create-server-modal";
import { InviteModal } from "./invite-modal";
import { ServerSelect } from "./server-select";

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
  const { setCurrentServer, setServers } = useServerStore();
  const [currentServerId, setCurrentServerId] = useState(defaultValue);
  const currentServer = useMemo(
    () => servers.find((server) => server.id === currentServerId),
    [currentServerId, servers]
  );

  useEffect(() => {
    setServers(servers);
    setCurrentServer(currentServer);
  }, [servers, setCurrentServer, currentServer, setServers]);

  return (
    <div className="p-2 w-full flex items-center gap-x-4">
      <div className="w-40">
        <ServerSelect
          onChange={(id) => setCurrentServerId(id)}
          defaultValue={defaultValue}
        />
      </div>
      <CreateServerModal
        triggerNode={(show) => (
          <BaseButton onClick={show} icon={Boxes}>
            add
          </BaseButton>
        )}
      />
      <BaseButton icon={Settings}>edit</BaseButton>
      {currentServer && (
        <InviteModal
          triggerNode={(show) => (
            <BaseButton onClick={show} icon={UserPlus}>
              invite
            </BaseButton>
          )}
        />
      )}
    </div>
  );
};
