import {
  PlaySquare,
  MousePointerSquare,
  Radio,
  Music3,
  Mic2,
  Disc2,
  ListTodo,
  ListMusic,
} from "lucide-react";
import { ComponentType, FC } from "react";

interface IconProps {
  className?: string;
}

interface IconWrapperProps {
  Icon: ComponentType<IconProps>;
}

const IconWrapper: FC<IconWrapperProps> = ({ Icon }) => {
  return <Icon className="w-4 h-4" />;
};

export const SideBarList = [
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
