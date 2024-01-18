"use client";
import { FileUpload } from "@/components/file-upload";
import CommonModal, {
  CommonModalProps,
} from "@/components/modals/common-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import withModalTrigger from "@/hoc/with-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useServerStore } from "../../_hook/use-server-store";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "请输入服务名称",
  }),
  imageUrl: z.string().min(1, {
    message: "Oi! 差个图",
  }),
});

const _EditServerModal: FC<CommonModalProps> = (props) => {
  const router = useRouter();

  const { currentServer: server, setCurrentServer } = useServerStore();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (!server) return;
    form.setValue("name", server.name);
    form.setValue("imageUrl", server.imageUrl);
  }, [server, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const _server = await axios.patch(`/api/servers/${server?.id}`, values);
      setCurrentServer(_server.data);

      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CommonModal title="编辑你的服务" {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      服务名称
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:right-0 text-black focus-visible:ring-offset-0"
                        placeholder="请输入服务名称"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" loading={isLoading} className="w-full">
                CONFIRM
              </Button>
            </div>
          </form>
        </Form>
      </CommonModal>
    </div>
  );
};

export const EditServerModal = withModalTrigger(_EditServerModal);
