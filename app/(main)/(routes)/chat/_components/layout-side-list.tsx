"use client";
import { ChannelType, Profile } from "@prisma/client";
import { useServerStore } from "../_hook/use-server-store";
import {
  ChannelIconMap,
  RoleIconMap,
  ServerWithMembersWithProfiles,
} from "../_types";
import { ServerSection } from "./layout-side-list-section";
import { SearchDataType, SearchServer } from "./search-server";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

const generateData = (
  server: ServerWithMembersWithProfiles | null,
  profile: Profile
) => {
  if (!server) return null;

  const textChannels = server.channels.filter(
    (c) => c.type === ChannelType.TEXT
  );
  const audioChannels = server.channels.filter(
    (c) => c.type === ChannelType.AUDIO
  );
  const videoChannels = server.channels.filter(
    (c) => c.type === ChannelType.VIDEO
  );
  // const members = server.members.filter((m) => m.profileId !== profile.id);
  const members = server.members;

  return {
    info: {
      textChannels,
      audioChannels,
      videoChannels,
      members,
    },
    data: [
      {
        label: "Text Channels",
        type: "channel",
        data: textChannels.map((c) => ({
          id: c.id,
          name: c.name,
          icon: ChannelIconMap[c.type],
        })),
      },
      {
        label: "Audio Channels",
        type: "channel",
        data: audioChannels.map((c) => ({
          id: c.id,
          name: c.name,
          icon: ChannelIconMap[c.type],
        })),
      },
      {
        label: "Video Channels",
        type: "channel",
        data: videoChannels.map((c) => ({
          id: c.id,
          name: c.name,
          icon: ChannelIconMap[c.type],
        })),
      },
      {
        label: "Members",
        type: "member",
        data: members.map((m) => ({
          id: m.id,
          name: m.profile.name,
          icon: RoleIconMap[m.role],
        })),
      },
    ] as SearchDataType[],
  };
};

export const LayoutSideList = ({ profile }: { profile: Profile }) => {
  const { currentServer: server } = useServerStore();
  if (!server) return null;

  const { data, info } = generateData(server, profile) ?? {};
  const member = server?.members?.find((m) => m.profileId === profile.id)!;
  const { role } = member;

  return (
    <>
      <div className="h-[2.5rem] w-full border-b-[2px] border-neutral-300">
        <SearchServer data={data} profile={profile} />
      </div>
      <div className="h-[calc(100%-2.5rem)] w-full overflow-y-auto px-3 pt-2 space-y-4">
        {!!info?.textChannels?.length && (
          <div>
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />
            <div className="space-y-[2px]">
              {info?.textChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!info?.audioChannels?.length && (
          <div>
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Audio Channels"
            />
            <div className="space-y-[2px]">
              {info?.audioChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!info?.videoChannels?.length && (
          <div>
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
            />
            <div className="space-y-[2px]">
              {info?.videoChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!info?.members?.length && (
          <div>
            <ServerSection
              sectionType="members"
              role={role}
              label="Members"
              server={server}
            />
            <div className="space-y-[2px]">
              {info?.members.map((member) => (
                <ServerMember key={member.id} member={member} server={server} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
