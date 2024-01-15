import {
  PlaySquare,
  MousePointerSquare,
  Radio,
  Music3,
  Mic2,
  Disc2,
  ListTodo,
  ListMusic,
  LucideIcon,
} from "lucide-react";

const IconWrapper = ({ Icon }: { Icon: LucideIcon }) => {
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
    ],
  },
];
