"use client";
import { ModeToggle } from "@/components/mode-toggle";
import Typography from "@/components/typography";
import { cn } from "@/lib/utils";
import {
  Book,
  HomeIcon,
  Joystick,
  MessageCircleMore,
  Music2Icon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { SidebarContainer } from "./sidebar-container";

const list = [
  {
    name: "Home",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    name: "Document",
    icon: <Book />,
    path: "/documents",
  },
  {
    name: "Music",
    icon: <Music2Icon />,
    path: "/music",
  },
  {
    name: "Permission",
    icon: <Joystick />,
    path: "/permission",
  },
  {
    name: "Chat",
    icon: <MessageCircleMore />,
    path: "/chat",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <SidebarContainer>
      {() => {
        // const isClosed = Number(width?.slice(0, -2)) < MIN_RESIZE_WIDTH;

        return (
          <div className="h-full pt-1 px-2 flex flex-col items-center gap-y-2 overflow-hidden">
            <div className="w-full translate-x-[-0.2rem]">
              <ModeToggle />
            </div>
            {list.map((item) => (
              <div
                onClick={() => router.push(item.path)}
                className={cn(
                  "w-full flex items-center rounded-md p-[0.35rem] cursor-pointer hover:bg-neutral-200 hover:dark:bg-neutral-600 transition-all duration-200",
                  pathname === item.path && "bg-neutral-200 dark:bg-neutral-600"
                )}
                key={item.name}
              >
                <span className="mr-3">{item.icon}</span>
                {/* {!isClosed && <Typography.Small>{item.name}</Typography.Small>} */}
                <Typography.Small>{item.name}</Typography.Small>
              </div>
            ))}
          </div>
        );
      }}
    </SidebarContainer>
  );
};
