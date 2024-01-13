export const LibraryList = ({ songs }: { songs: any[] }) => {
  return (
    <div className="h-full w-full p-2 gap-y-2 flex-grow overflow-y-scroll scroll-m-1">
      {songs?.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};
