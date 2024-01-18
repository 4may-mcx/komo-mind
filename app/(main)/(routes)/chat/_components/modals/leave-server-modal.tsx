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
import { toast } from "sonner";

const _LeaveServerModal: FC<CommonModalProps> = (props) => {
  const router = useRouter();
  const { currentServer } = useServerStore();

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    // try {
    //   setIsLoading(true);
    //   await await axios.patch(`/api/servers/${server?.id}/leave`);

    //   router.refresh();
    //   router.push("/chat");
    //   window.location.reload();
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setIsLoading(false);
    // }
    toast.error("功能还没做，全都不许走！");
  };

  return (
    <CommonModal
      title="退出服务"
      description={
        <>
          你确定要退出「
          <span className="font-bold text-lg"> {currentServer?.name} </span>
          」服务吗？
        </>
      }
      footer={
        <Button onClick={onClick} loading={isLoading}>
          确认退出
        </Button>
      }
      {...props}
    />
  );
};

export const LeaveServerModal = withModalTrigger(_LeaveServerModal);
