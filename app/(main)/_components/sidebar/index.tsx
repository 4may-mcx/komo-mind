"use client";
import { ModeToggle } from "@/components/mode-toggle";
import Typography from "@/components/typography";
import { cn } from "@/lib/utils";
import { Edit, Joystick, Music2Icon, Printer, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { SidebarContainer } from "./sidebar-container";

const list = [
  // {
  //   name: "Home",
  //   icon: <HomeIcon />,
  //   path: "/",
  //   disable: true,
  // },
  // {
  //   name: "Document",
  //   icon: <Book />,
  //   path: "/documents",
  //   disable: true,
  // },
  {
    name: "Music",
    icon: <Music2Icon />,
    path: "/music",
  },
  {
    name: "Playground",
    icon: <Joystick />,
    path: "/playground",
  },
  {
    name: "MindMap",
    icon: <Edit />,
    path: "/mindmap",
  },
  {
    name: "React Playground",
    icon: <Printer />,
    path: "/react-playground",
  },
  {
    name: "Permission",
    icon: <Settings />,
    path: "/permission",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <SidebarContainer>
      {() => {
        return (
          <div className="h-full pt-1 px-2 flex flex-col items-center gap-y-2 overflow-hidden">
            <div className="w-full translate-x-[-0.2rem]">
              <ModeToggle />
            </div>
            {list.map((item) => {
              const active =
                item.path === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.path);
              return (
                <div
                  onClick={() => router.push(item.path)}
                  className={cn(
                    "w-full flex items-center rounded-md p-[0.35rem] cursor-pointer hover:bg-neutral-200 hover:dark:bg-neutral-600 transition-all duration-200",
                    active && "bg-neutral-200 dark:bg-neutral-600"
                  )}
                  key={item.name}
                >
                  <span className="mr-3">{item.icon}</span>
                  <Typography.Small>{item.name}</Typography.Small>
                </div>
              );
            })}
          </div>
        );
      }}
    </SidebarContainer>
  );
};
