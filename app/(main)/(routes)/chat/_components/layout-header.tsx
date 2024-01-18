"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Boxes,
  LogOut,
  LucideIcon,
  Settings,
  Trash,
  UserPlus,
} from "lucide-react";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useServerStore } from "../_hook/use-server-store";
import { ServerWithMembersWithProfiles } from "../_types";
import { CreateServerModal } from "./modals/create-server-modal";
import { DeleteServerModal } from "./modals/delete-server-modal";
import { EditServerModal } from "./modals/edit-server-modal";
import { InviteModal } from "./modals/invite-modal";
import { LeaveServerModal } from "./modals/leave-server-modal";
import { ServerSelect } from "./server-select";

const BaseButton = ({
  icon: Icon,
  children,
  variant = "ghost",
  onClick,
}: {
  icon: LucideIcon;
  children: ReactNode;
  variant?: ButtonProps["variant"];
  onClick?: () => void;
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className="h-8 border-dashed border-[1px] border-neutral-400 gap-x-2 p-2  text-neutral-600 dark:text-neutral-400"
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
  servers: ServerWithMembersWithProfiles[];
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
    <div className="p-2 w-full h-full flex items-center gap-x-3">
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

      <EditServerModal
        triggerNode={(show) => (
          <BaseButton onClick={show} icon={Settings}>
            edit
          </BaseButton>
        )}
      />

      <InviteModal
        triggerNode={(show) => (
          <BaseButton onClick={show} icon={UserPlus}>
            invite
          </BaseButton>
        )}
      />

      <div className="flex flex-grow justify-end gap-x-3">
        <DeleteServerModal
          triggerNode={(show) => (
            <BaseButton onClick={show} icon={Trash}>
              delete
            </BaseButton>
          )}
        />
        <LeaveServerModal
          triggerNode={(show) => (
            <BaseButton onClick={show} icon={LogOut}>
              exit
            </BaseButton>
          )}
        />
      </div>
    </div>
  );
};
