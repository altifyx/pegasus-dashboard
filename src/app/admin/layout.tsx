import React from 'react';
import { cookies } from 'next/headers';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Authenticate & Check ADMIN env array
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('discord_user')?.value;
  const accessToken = cookieStore.get('discord_access_token')?.value;

  let userId: string | null = null;
  let userData: any = null;

  if (userCookie) {
    try {
      userData = JSON.parse(userCookie);
      userId = userData.id;
    } catch (e) {}
  }

  if (!userId && accessToken) {
    try {
      const userResponse = await fetch('https://discord.com/api/v10/users/@me', {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: 'no-store',
      });
      if (userResponse.ok) {
        userData = await userResponse.json();
        userId = userData.id;
      }
    } catch (e) {}
  }

  let adminIds: string[] = [];
  try {
    if (process.env.ADMIN) {
      adminIds = JSON.parse(process.env.ADMIN);
    }
  } catch (e) {
    adminIds = [process.env.ADMIN || ''];
  }

  // Not Logged In
  if (!userId) {
    return (
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full flex flex-col items-center justify-center min-h-[70vh] bg-black">
        <div className="border border-white/10 bg-white/[0.01] p-12 max-w-lg w-full rounded-none flex flex-col items-center text-center relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#5E5CE6]" />
          <Lock className="w-12 h-12 text-[#5E5CE6] mb-6" />
          <h1 className="text-3xl font-light tracking-tight text-white mb-4">Master Admin Console</h1>
          <p className="text-sm text-neutral-400 font-mono tracking-wide mb-8 leading-relaxed">
            Authorization Required. Connect your Discord account to verify master administrative permissions.
          </p>
          <a
            href="/api/auth/login"
            className="border border-[#5E5CE6]/40 bg-[#5E5CE6]/10 px-8 py-4 text-xs font-mono text-[#5E5CE6] hover:bg-[#5E5CE6] hover:text-black hover:border-[#5E5CE6] transition-all rounded-none w-full tracking-widest uppercase flex items-center justify-center gap-3 group"
          >
            <span>Login with Discord</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </main>
    );
  }

  // Logged In but Not Admin
  if (!adminIds.includes(userId)) {
    return (
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full flex flex-col items-center justify-center min-h-[70vh] bg-black">
        <div className="border border-red-500/20 bg-red-500/[0.02] p-12 max-w-lg w-full rounded-none flex flex-col items-center text-center relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
          <AlertCircle className="w-12 h-12 text-red-500 mb-6" />
          <h1 className="text-3xl font-light tracking-tight text-white mb-4">Access Denied</h1>
          <p className="text-sm text-neutral-400 font-mono tracking-wide mb-6 leading-relaxed">
            You are logged in as <span className="text-white font-semibold">{userData?.username || userId}</span> ({userId}), but your ID is not listed in the master <code className="text-red-400 bg-red-500/10 px-2 py-1">ADMIN</code> environment variable.
          </p>
          <p className="text-xs text-neutral-500 font-mono mb-8">
            This console is restricted to core system owners only.
          </p>
          <a
            href="/api/auth/logout"
            className="border border-white/10 bg-white/[0.02] px-8 py-4 text-xs font-mono text-neutral-300 hover:border-red-500 hover:bg-red-500 hover:text-black transition-all rounded-none w-full tracking-widest uppercase flex items-center justify-center gap-3"
          >
            <span>Disconnect Account</span>
          </a>
        </div>
      </main>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black text-neutral-100">
      <AdminSidebar user={{ username: userData?.username || userId, id: userId }} />
      <div className="flex-1 min-w-0 flex flex-col bg-black">
        {children}
      </div>
    </div>
  );
}
