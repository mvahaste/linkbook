import BottomNavigationBar from "@/components/bottom-nav-bar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-grow flex-col">
      {children}
      <BottomNavigationBar />
    </div>
  );
}
