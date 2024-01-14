const ServerPage = ({
  params: { serverId },
}: {
  params: { serverId: string };
}) => {
  return <div>{serverId}</div>;
};

export default ServerPage;
