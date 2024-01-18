const ConversationPage = ({
  params: { memberId },
}: {
  params: { memberId: string };
}) => {
  return <div>memberId: {memberId}</div>;
};

export default ConversationPage;
