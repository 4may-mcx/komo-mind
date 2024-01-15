import { Sidebar } from "../_components/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Sidebar />
      <main className="h-full flex-1 flex items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
