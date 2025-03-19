import BottomNavigationBar from "@/components/bottom-nav-bar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-grow flex-col">
      <div className="mx-auto w-full max-w-2xl flex-grow p-5">{children}</div>
      <BottomNavigationBar />
    </div>
  );
}
