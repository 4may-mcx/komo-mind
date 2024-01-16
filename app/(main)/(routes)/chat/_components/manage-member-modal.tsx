"use client";
import CommonModal, {
  CommonModalProps,
} from "@/components/modals/common-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/user-avatar";
import withModalTrigger from "@/hoc/with-modal";
import { MemberRole } from "@prisma/client";
import axios from "axios";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { FC, ReactNode, useState } from "react";
import { toast } from "sonner";
import { useServerStore } from "../_hook/use-server-store";
import { MemberRole2Label } from "../_types";

const roleIconMap: Record<MemberRole, ReactNode | null> = {
  [MemberRole.GUEST]: null,
  [MemberRole.ADMIN]: <ShieldCheck className="h-4 w-4 text-indigo-500" />,
  [MemberRole.MODERATOR]: <ShieldAlert className="h-4 w-4 text-green-600" />,
};

const _ManageMemberModal: FC<CommonModalProps> = ({ ...props }) => {
  const router = useRouter();
  const { currentServer: server, setCurrentServer } = useServerStore();
  const [loadingId, setLoadingId] = useState("");

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
          memberId,
        },
      });

      const _server = await axios.patch(url, { role });
      setCurrentServer(_server.data);

      toast.success("修改成功");
      setLoadingId("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };
  return (
    <CommonModal
      title="狠狠的安排！"
      description={`${server?.members.length} 个成员`}
      {...props}
    >
      <ScrollArea className="mt-8 max-h-[420px] pr-6">
        {server?.members.map((member) => {
          const isNotCurrentUser =
            server.profileId !== member.profileId && loadingId !== member.id;

          const isLoading = loadingId === member.id;
          return (
            <div key={member.id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar src={member.profile.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="text-xs font-semibold flex items-center gap-x-1">
                  {member.profile.name.replace("null", "")}
                  {roleIconMap[member.role]}
                </div>
                <p className="text-xs text-neutral-500">
                  {member.profile.email}
                </p>
              </div>
              {isNotCurrentUser && (
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="h-4 w-4 text-neutral-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <ShieldQuestion className="h-4 w-4 mr-2" />
                          <span>身份</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem
                            onClick={() =>
                              onRoleChange(member.id, MemberRole.GUEST)
                            }
                          >
                            <Shield className="h-4 w-4 mr-2" />
                            {MemberRole2Label[MemberRole.GUEST]}
                            {member.role === MemberRole.GUEST && (
                              <Check className="h-4 w-4 ml-auto" />
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              onRoleChange(member.id, MemberRole.MODERATOR)
                            }
                          >
                            <ShieldAlert className="h-4 w-4 mr-2" />
                            {MemberRole2Label[MemberRole.MODERATOR]}
                            {member.role === MemberRole.MODERATOR && (
                              <Check className="h-4 w-4 ml-auto" />
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              onRoleChange(member.id, MemberRole.ADMIN)
                            }
                          >
                            <ShieldCheck className="h-4 w-4 mr-2" />
                            {MemberRole2Label[MemberRole.ADMIN]}
                            {member.role === MemberRole.ADMIN && (
                              <Check className="h-4 w-4 ml-auto" />
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Gavel className="h-4 w-4 mr-2" />
                        踢出
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
              {isLoading && (
                <Loader2 className="h-4 w-4 animate-spin text-neutral-500 ml-auto" />
              )}
            </div>
          );
        })}
      </ScrollArea>
    </CommonModal>
  );
};

export const ManageMemberModal = withModalTrigger(_ManageMemberModal);
