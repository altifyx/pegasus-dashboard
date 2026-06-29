export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col w-full">
      {children}
    </div>
  );
}
