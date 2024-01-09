import { NavBar } from "./_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      <NavBar />
      <main className="h-full mt-20">{children}</main>
    </div>
  );
};

export default MarketingLayout;
