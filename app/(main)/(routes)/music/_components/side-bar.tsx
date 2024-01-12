"use client";

import Typography from "@/components/typography";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { SideBarList } from "./config";

const SideBarItem = ({
  icon,
  title,
  isActive,
}: {
  title: string;
  icon?: ReactNode;
  isActive?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex items-center space-x-2 cursor-pointer px-4 py-2 w-52 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-600 hover:translate-x-1 duration-300",
        isActive && "bg-neutral-100 dark:bg-neutral-600"
      )}
    >
      {icon}
      <Typography.Small>{title}</Typography.Small>
    </div>
  );
};

export const MusicSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      {SideBarList.map(({ title, children }) => (
        <div key={title} className="m-4">
          <Typography.Large className="ml-4">{title}</Typography.Large>
          {children.map(({ title, icon, path }, index) => (
            <div
              className="flex items-center my-2"
              key={`${title}-${index}`}
              onClick={() => router.push(path)}
            >
              <SideBarItem
                isActive={pathname.startsWith(path)}
                icon={icon}
                title={title}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
