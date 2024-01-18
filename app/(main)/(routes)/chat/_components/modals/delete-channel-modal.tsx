"use client";
import CommonModal, {
  CommonModalProps,
} from "@/components/modals/common-modal";
import { Button } from "@/components/ui/button";
import withModalTrigger from "@/hoc/with-modal";
import { Channel } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useServerStore } from "../../_hook/use-server-store";

const _DeleteChannelModal: FC<CommonModalProps & { channel: Channel }> = (
  props
) => {
  const router = useRouter();
  const { currentServer } = useServerStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      // await axios.delete(`/api/servers/${props.channel.id}`);

      router.refresh();
      router.push(`/chat/${currentServer?.id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CommonModal
      title="删除频道"
      description={
        <>
          你确定要删除「
          <span className="font-bold text-lg"> {props.channel.name} </span>
          」频道吗？
        </>
      }
      footer={
        <Button onClick={onClick} loading={isLoading}>
          确认删除
        </Button>
      }
      {...props}
    />
  );
};

export const DeleteChannelModal = withModalTrigger(_DeleteChannelModal);
