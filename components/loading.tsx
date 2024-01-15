import { Spinner } from "@/components/ui/spinner";
const Loading = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
};

export default Loading;
