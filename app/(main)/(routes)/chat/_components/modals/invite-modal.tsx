"use client";
import CommonModal, {
  CommonModalProps,
} from "@/components/modals/common-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import withModalTrigger from "@/hoc/with-modal";
import { useOrigin } from "@/hooks/use-origin";
import axios from "axios";
import { Check, Copy, RefreshCw } from "lucide-react";
import { FC, useState } from "react";
import { toast } from "sonner";
import { useServerStore } from "../../_hook/use-server-store";

const _InviteModal: FC<CommonModalProps> = (props) => {
  const origin = useOrigin();
  const { setCurrentServer, currentServer } = useServerStore();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const inviteUrl = `${origin}/chat/invite/${currentServer?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    toast.success("邀请码已经复制到剪贴板");
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  const onRefreshCode = async () => {
    try {
      setLoading(true);
      const rep = await axios.patch(
        `/api/servers/${currentServer?.id}/invite-code`
      );

      setCurrentServer(rep.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommonModal title="来邀请你的朋友吧！OMO" {...props}>
      <div className="p-6">
        <Label>邀请链接</Label>
        <div className="flex items-center mt-2 gap-x-2">
          <Input disabled={loading} value={inviteUrl} readOnly />
          <Button
            size="icon"
            variant="ghost"
            onClick={onCopy}
            disabled={copied}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <Button
          onClick={onRefreshCode}
          loading={loading}
          variant="link"
          size="sm"
          className="text-sm mt-4 gap-x-2"
        >
          生成新链接
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </CommonModal>
  );
};

export const InviteModal = withModalTrigger(_InviteModal);
