import { Sidebar } from '@/components/Sidebar';
import { cookies } from 'next/headers';
import { getUserAdminGuilds, getDashboardGuilds } from '@/lib/api';

export default async function GuildDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('discord_access_token')?.value;
  const adminGuilds = await getUserAdminGuilds(accessToken);
  const fallbackGuilds = await getDashboardGuilds();

  const guilds = adminGuilds || fallbackGuilds;

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col lg:flex-row w-full">
      <Sidebar guilds={guilds} />
      <div className="flex-1 flex flex-col min-h-screen bg-black overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
