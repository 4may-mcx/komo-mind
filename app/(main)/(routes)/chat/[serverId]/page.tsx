const ServerPage = async ({
  params: { serverId },
}: {
  params: { serverId: string };
}) => {
  return (
    <div>
      {/* <CreateServerModal /> */}
      active: {serverId}
    </div>
  );
};

export default ServerPage;
