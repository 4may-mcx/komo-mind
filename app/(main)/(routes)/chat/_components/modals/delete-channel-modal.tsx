"use client";
import CommonModal, {
  CommonModalProps,
} from "@/components/modals/common-modal";
import { Button } from "@/components/ui/button";
import withModalTrigger from "@/hoc/with-modal";
import { Channel } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { FC, useState } from "react";
import { useServerStore } from "../../_hook/use-server-store";
import useModalProps from "@/hooks/use-modal-props";
import { toast } from "sonner";

const _DeleteChannelModal: FC<CommonModalProps & { channel: Channel }> = ({
  isOpen: _isOpen,
  channel,
  ...props
}) => {
  const router = useRouter();
  const { currentServer: server } = useServerStore();
  const { isOpen, closeModal } = useModalProps(true);
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });

      await axios.delete(url);

      router.refresh();
      toast.success("频道删除成功");
      closeModal();
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
          <span className="font-bold text-lg"> {channel.name} </span>
          」频道吗？
        </>
      }
      footer={
        <Button onClick={onClick} loading={isLoading}>
          确认删除
        </Button>
      }
      isOpen={isOpen && _isOpen}
      {...props}
    />
  );
};

export const DeleteChannelModal = withModalTrigger(_DeleteChannelModal);
