import BottomNavigationBar from "@/components/bottom-nav-bar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex max-w-2xl flex-grow flex-col p-5">{children}</div>
      <BottomNavigationBar />
    </>
  );
}
