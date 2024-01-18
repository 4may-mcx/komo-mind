"use client";
import CommonModal, {
  CommonModalProps,
} from "@/components/modals/common-modal";
import { Button } from "@/components/ui/button";
import withModalTrigger from "@/hoc/with-modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useServerStore } from "../../_hook/use-server-store";

const _DeleteServerModal: FC<CommonModalProps> = (props) => {
  const router = useRouter();
  const { currentServer } = useServerStore();

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/servers/${currentServer?.id}`);

      router.refresh();
      router.push("/chat");
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CommonModal
      title="删除服务"
      description={
        <div>
          你确定要删除「
          <span className="font-bold text-lg"> {currentServer?.name} </span>
          」服务吗？
        </div>
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

export const DeleteServerModal = withModalTrigger(_DeleteServerModal);
