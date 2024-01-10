"use client";

import Typography from "@/components/typography";
import { cn } from "@/lib/utils";
import {
  Disc2,
  File,
  ListMusic,
  ListTodo,
  Mic2,
  MousePointerSquare,
  Music3,
  PlaySquare,
  Radio,
  Star,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ComponentType, FC, ReactNode } from "react";

interface IconProps {
  className?: string;
}

interface IconWrapperProps {
  Icon: ComponentType<IconProps>;
}

const IconWrapper: FC<IconWrapperProps> = ({ Icon }) => {
  return <Icon className="w-4 h-4" />;
};

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

  const options = [
    {
      title: "Discover",
      children: [
        {
          title: "Listen Now",
          icon: <IconWrapper Icon={PlaySquare} />,
          path: "/music/listening-now",
        },
        {
          title: "Browse",
          icon: <IconWrapper Icon={MousePointerSquare} />,
          path: "/music/browse",
        },
        {
          title: "Radio",
          icon: <IconWrapper Icon={Radio} />,
          path: "/music/radio",
        },
      ],
    },
    {
      title: "Library",
      children: [
        {
          title: "Songs",
          icon: <IconWrapper Icon={Music3} />,
          path: "/music/songs",
        },
        {
          title: "Artists",
          icon: <IconWrapper Icon={Mic2} />,
          path: "/music/artists",
        },
        {
          title: "Albums",
          icon: <IconWrapper Icon={Disc2} />,
          path: "/music/albums",
        },
        {
          title: "Todo",
          icon: <IconWrapper Icon={ListTodo} />,
          path: "/music/todo",
        },
      ],
    },
    {
      title: "PlayList",
      children: [
        {
          title: "Recently Played",
          icon: <IconWrapper Icon={ListMusic} />,
          path: "/music/recently-played",
        },
        {
          title: "Liked Songs",
          icon: <IconWrapper Icon={ListMusic} />,
          path: "/music/liked-songs",
        },
        {
          title: "Top Songs",
          icon: <IconWrapper Icon={ListMusic} />,
          path: "/music/top-songs",
        },
        {
          title: "Top Artists",
          icon: <IconWrapper Icon={ListMusic} />,
          path: "/music/top-artists",
        },
        {
          title: "Top Albums",
          icon: <IconWrapper Icon={ListMusic} />,
          path: "/music/top-albums",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      {options.map(({ title, children }) => (
        <div key={title} className="m-4">
          <Typography.Large className="ml-4">{title}</Typography.Large>
          {children.map(({ title, icon, path }, index) => (
            <div
              className="flex items-center my-2"
              key={`${title}-${index}`}
              onClick={() => router.push(path)}
            >
              <SideBarItem
                isActive={pathname === path}
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
