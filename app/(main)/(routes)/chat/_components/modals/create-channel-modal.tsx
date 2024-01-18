"use client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import withModalTrigger from "@/hoc/with-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChannelType } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { FC } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useServerStore } from "../../_hook/use-server-store";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "请输入频道名称",
    })
    .refine((name) => name !== "general", {
      message: "频道名称不能为 general",
    }),

  type: z.nativeEnum(ChannelType),
});

const _CreateChannelModal: FC<CommonModalProps & {defaultType?: ChannelType}> = (props) => {
  const { currentServer: server } = useServerStore();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: props.defaultType ?? ChannelType.TEXT,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/channels",
        query: {
          serverId: server?.id,
        },
      });
      await axios.post(url, values);

      form.reset();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CommonModal title="创建频道" {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      频道名称（不能含有中文字符，有bug，懒得修）
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:right-0 text-black focus-visible:ring-offset-0"
                        placeholder="请输入频道名称"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      频道类型
                    </FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                          <SelectValue placeholder="Select a channel type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ChannelType).map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="capitalize"
                          >
                            {type.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-end">
                <Button type="submit" loading={isLoading}>
                  确认
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CommonModal>
    </div>
  );
};

export const CreateChannelModal = withModalTrigger(_CreateChannelModal);
