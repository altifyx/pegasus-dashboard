import React from 'react';
import LiveTelemetryDashboard from '@/components/LiveTelemetryDashboard';

async function getBotStats() {
  try {
    const res = await fetch('http://localhost:2000/stats', {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${process.env.BOT_API_TOKEN || ''}`
      }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

export default async function AdminStatusPage() {
  const stats = await getBotStats();

  const fallbackData = {
    status: 'online (fallback)',
    uptime: 124850,
    started_at: new Date(Date.now() - 124850 * 1000).toISOString(),
    guilds: { total: 42, large: 5, voice_active: 12 },
    users: { total: 15420, unique: 14980, active_today: 3420, online: 4120 },
    commands: {
      total_executed: 152480,
      today: 12450,
      this_hour: 842,
      per_minute: 14.2,
      most_used: [
        { command: 'help', count: 4521 },
        { command: 'daily', count: 3842 },
        { command: 'rank', count: 2951 },
        { command: 'work', count: 1842 },
        { command: 'balance', count: 1510 }
      ]
    },
    system: {
      memory_usage: 128450120,
      memory_total: 17179869184,
      cpu_usage: 14.2,
      latency: 24,
      shard_count: 1
    },
    features: {
      music: false,
      moderation: true,
      economy: true,
      leveling: true,
      giveaways: true,
      tickets: true,
      activity: {
        economy: 4512,
        moderation: 312,
        tickets: 152,
        giveaways: 89,
        xp: 89412
      }
    },
    version: '1.0.0-core',
    cache_age: 1240
  };

  return (
    <LiveTelemetryDashboard
      initialStats={stats || fallbackData}
      initialIsOnline={Boolean(stats)}
    />
  );
}
