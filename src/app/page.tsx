import Link from 'next/link';
import { cookies } from 'next/headers';
import { getBotStats } from '@/lib/api';
import { Terminal, Cpu, Database, Users, ArrowRight, Mic, Shield, Gavel, Coins, Sparkles, Ticket, Gift, Filter, Globe, FileText, Activity, LogIn } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const stats = await getBotStats();
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('discord_user')?.value;
  let user: { username?: string; id?: string } | null = null;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie);
    } catch (e) {}
  }

  return (
    <div className="min-h-screen bg-[#000000] text-neutral-100 flex flex-col selection:bg-[#5E5CE6]/30 selection:text-white">
      {/* Navigation */}
      <header className="border-b border-white/5 backdrop-blur-md bg-[#000000]/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-[#5E5CE6] shadow-[0_0_15px_#5E5CE6]" />
            <span className="font-mono text-sm tracking-widest font-bold uppercase text-white">Pegasus // System</span>
          </div>
          <div className="flex items-center gap-6 text-xs font-mono tracking-wider">
            <Link href="/docs" className="hover:text-[#5E5CE6] transition-colors">Documentation</Link>
            <Link href="#features" className="hover:text-[#5E5CE6] transition-colors">Features</Link>
            <Link href="#metrics" className="hover:text-[#5E5CE6] transition-colors">Live Metrics</Link>
            {user ? (
              <Link href="/dashboard" className="border border-white/10 px-4 py-2 hover:border-[#5E5CE6] hover:text-[#5E5CE6] transition-all rounded-none bg-white/[0.02] flex items-center gap-2">
                <span>{user.username} // Dashboard</span>
              </Link>
            ) : (
              <a href="/api/auth/login" className="border border-[#5E5CE6]/40 bg-[#5E5CE6]/10 px-4 py-2 text-[#5E5CE6] hover:bg-[#5E5CE6] hover:text-black hover:border-[#5E5CE6] transition-all rounded-none flex items-center gap-2">
                <LogIn className="w-3.5 h-3.5" />
                <span>Discord Login</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <section className="max-w-7xl w-full mx-auto px-6 pt-32 pb-32 flex flex-col justify-center border-b border-white/5">
          <div className="max-w-4xl">
            <div className="text-xs font-mono tracking-widest text-[#5E5CE6] uppercase mb-6">
              // PEGASUS
            </div>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-8 leading-[1.1]">
              Pegasus is an open-source Discord bot. Our goal is to achieve total transparency and give users the power to fully customize the bot to their exact needs.
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 mb-12 max-w-2xl font-light leading-relaxed">
              Pegasus replaces multiple generic bots with a single, high-performance, fully configurable modular architecture powered by a sleek management control plane.
            </p>
            <div className="flex flex-wrap items-center gap-4 font-mono text-sm">
              {user ? (
                <Link href="/dashboard" className="flex items-center gap-3 border border-white/10 border-l-2 border-l-[#5E5CE6] bg-white/[0.02] px-6 py-4 text-white hover:bg-white/[0.05] transition-all rounded-none group">
                  <span>Enter Administration Panel</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <a href="/api/auth/login" className="flex items-center gap-3 border border-[#5E5CE6]/40 border-l-2 border-l-[#5E5CE6] bg-[#5E5CE6]/10 px-6 py-4 text-[#5E5CE6] hover:bg-[#5E5CE6] hover:text-black transition-all rounded-none group">
                  <LogIn className="w-4 h-4" />
                  <span>Authenticate with Discord</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              )}
              <a href="https://discord.com/oauth2/authorize?client_id=1375140177961418774&permissions=8&scope=bot%20applications.commands" target="_blank" rel="noopener noreferrer" className="border border-white/10 px-6 py-4 hover:border-white/20 text-neutral-300 transition-colors rounded-none bg-white/[0.02]">
                Deploy to Server
              </a>
            </div>
          </div>
        </section>

        {/* Live Bot Metrics (Rule of Three Minimalism) */}
        <section id="metrics" className="max-w-7xl w-full mx-auto px-6 py-28 border-b border-white/5">
          <div className="mb-16">
            <div className="text-xs font-mono tracking-widest text-[#5E5CE6] uppercase mb-3">// TELEMETRY</div>
            <h2 className="text-3xl font-light tracking-tight text-white">System Diagnostics & Activity</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Metric Card 1 */}
            <div className="border border-white/5 p-8 bg-white/[0.01] backdrop-blur-md flex flex-col justify-between rounded-none">
              <Users className="w-6 h-6 text-neutral-400 mb-6" />
              <div className="text-4xl font-light tracking-tight text-white mb-2">{(stats as any).users?.total?.toLocaleString() ?? '0'}</div>
              <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Total Users</div>
            </div>
            {/* Metric Card 2 */}
            <div className="border border-white/5 p-8 bg-white/[0.01] backdrop-blur-md flex flex-col justify-between rounded-none">
              <Terminal className="w-6 h-6 text-neutral-400 mb-6" />
              <div className="text-4xl font-light tracking-tight text-white mb-2">{(stats as any).commands?.total_executed?.toLocaleString() ?? '0'}</div>
              <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Commands Executed</div>
            </div>
            {/* Metric Card 3 */}
            <div className="border border-white/5 p-8 bg-white/[0.01] backdrop-blur-md flex flex-col justify-between rounded-none">
              <Database className="w-6 h-6 text-neutral-400 mb-6" />
              <div className="text-4xl font-light tracking-tight text-white mb-2">{(stats as any).guilds?.total ?? 0}</div>
              <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Guilds</div>
            </div>
            {/* Metric Card 4 */}
            <div className="border border-white/5 p-8 bg-white/[0.01] backdrop-blur-md flex flex-col justify-between rounded-none">
              <Cpu className="w-6 h-6 text-neutral-400 mb-6" />
              <div className="text-4xl font-light tracking-tight text-white mb-2">{(stats as any).system?.latency ?? 0}ms</div>
              <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Discord Heartbeat Ping</div>
            </div>
          </div>
        </section>

        {/* Feature Blocks (Rule of Three Minimalism) */}
        <section id="features" className="max-w-7xl w-full mx-auto px-6 py-28">
          <div className="mb-16">
            <div className="text-xs font-mono tracking-widest text-[#5E5CE6] uppercase mb-3">// CAPABILITIES</div>
            <h2 className="text-3xl font-light tracking-tight text-white">Systems</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="border border-white/5 p-10 bg-white/[0.01] backdrop-blur-md flex flex-col justify-between rounded-none group hover:border-white/10 transition-colors">
              <div>
                <Mic className="w-6 h-6 text-neutral-400 mb-6 group-hover:text-[#5E5CE6] transition-colors" />
                <h3 className="text-xl font-normal text-white mb-4 tracking-tight">Join to Create (JTC)</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  Dynamic voice channel management that instantly spawns temporary rooms with custom templates and automated cleanup.
                </p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="border border-white/5 p-10 bg-white/[0.01] backdrop-blur-md flex flex-col justify-between rounded-none group hover:border-white/10 transition-colors">
              <div>
                <Shield className="w-6 h-6 text-neutral-400 mb-6 group-hover:text-[#5E5CE6] transition-colors" />
                <h3 className="text-xl font-normal text-white mb-4 tracking-tight">AutoMod V2 & Quarantine Vault</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  Automated server security and proactive message scanning with flexible triggers, custom thresholds, and an isolating Quarantine Vault.
                </p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="border border-white/5 p-10 bg-white/[0.01] backdrop-blur-md flex flex-col justify-between rounded-none group hover:border-white/10 transition-colors">
              <div>
                <Gavel className="w-6 h-6 text-neutral-400 mb-6 group-hover:text-[#5E5CE6] transition-colors" />
                <h3 className="text-xl font-normal text-white mb-4 tracking-tight">Advanced Moderation</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  Comprehensive staff moderation workflows, automated penalty escalation triggers, and immutable audit logging.
                </p>
              </div>
            </div>
            {/* Feature 4 */}
            <div className="border border-white/5 p-10 bg-white/[0.01] backdrop-blur-md flex flex-col justify-between rounded-none group hover:border-white/10 transition-colors">
              <div>
                <Coins className="w-6 h-6 text-neutral-400 mb-6 group-hover:text-[#5E5CE6] transition-colors" />
                <h3 className="text-xl font-normal text-white mb-4 tracking-tight">Comprehensive Economy</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  Feature-rich server economy with daily rewards, structured jobs, gambling minigames, and a fully customizable item shop.
                </p>
              </div>
            </div>
            {/* Feature 5 */}
            <div className="border border-white/5 p-10 bg-white/[0.01] backdrop-blur-md flex flex-col justify-between rounded-none group hover:border-white/10 transition-colors">
              <div>
                <Sparkles className="w-6 h-6 text-neutral-400 mb-6 group-hover:text-[#5E5CE6] transition-colors" />
                <h3 className="text-xl font-normal text-white mb-4 tracking-tight">XP & Engagement Gamification</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  Dual text and voice activity tracking, visual rank cards, custom leaderboards, automated role rewards, and engagement quests.
                </p>
              </div>
            </div>
            {/* Feature 6 */}
            <div className="border border-white/5 p-10 bg-white/[0.01] backdrop-blur-md flex flex-col justify-between rounded-none group hover:border-white/10 transition-colors">
              <div>
                <Ticket className="w-6 h-6 text-neutral-400 mb-6 group-hover:text-[#5E5CE6] transition-colors" />
                <h3 className="text-xl font-normal text-white mb-4 tracking-tight">Professional Tickets</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  Modular support ticketing workflows via interactive panels with dedicated staff routing, transcripts, and advanced analytics.
                </p>
              </div>
            </div>
            {/* Feature 7 */}
            <div className="border border-white/5 p-10 bg-white/[0.01] backdrop-blur-md flex flex-col justify-between rounded-none group hover:border-white/10 transition-colors">
              <div>
                <Gift className="w-6 h-6 text-neutral-400 mb-6 group-hover:text-[#5E5CE6] transition-colors" />
                <h3 className="text-xl font-normal text-white mb-4 tracking-tight">Automated Giveaways</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  Advanced interactive giveaway modals with custom entry prerequisites, bonus multipliers, real-time countdowns, and reroll verification.
                </p>
              </div>
            </div>
            {/* Feature 8 */}
            <div className="border border-white/5 p-10 bg-white/[0.01] backdrop-blur-md flex flex-col justify-between rounded-none group hover:border-white/10 transition-colors">
              <div>
                <Filter className="w-6 h-6 text-neutral-400 mb-6 group-hover:text-[#5E5CE6] transition-colors" />
                <h3 className="text-xl font-normal text-white mb-4 tracking-tight">Automated Word Filtering</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  Proactive content filtering via literal or regex matching with configurable severity classifications and dedicated staff alerts.
                </p>
              </div>
            </div>
            {/* Feature 9 */}
            <div className="border border-white/5 p-10 bg-white/[0.01] backdrop-blur-md flex flex-col justify-between rounded-none group hover:border-white/10 transition-colors">
              <div>
                <Globe className="w-6 h-6 text-neutral-400 mb-6 group-hover:text-[#5E5CE6] transition-colors" />
                <h3 className="text-xl font-normal text-white mb-4 tracking-tight">Utility & Multi-Language</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  Advanced diagnostic lookup tools for profiles and servers, paired with a dynamic localization engine supporting multiple languages.
                </p>
              </div>
            </div>
            {/* Feature 10 */}
            <div className="border border-white/5 p-10 bg-white/[0.01] backdrop-blur-md flex flex-col justify-between rounded-none group hover:border-white/10 transition-colors">
              <div>
                <FileText className="w-6 h-6 text-neutral-400 mb-6 group-hover:text-[#5E5CE6] transition-colors" />
                <h3 className="text-xl font-normal text-white mb-4 tracking-tight">Custom Rich Embeds</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  Visually stunning custom announcements with fully configurable rich embeds and automated reaction role assignment.
                </p>
              </div>
            </div>
            {/* Feature 11 */}
            <div className="border border-white/5 p-10 bg-white/[0.01] backdrop-blur-md flex flex-col justify-between rounded-none group hover:border-white/10 transition-colors">
              <div>
                <Activity className="w-6 h-6 text-neutral-400 mb-6 group-hover:text-[#5E5CE6] transition-colors" />
                <h3 className="text-xl font-normal text-white mb-4 tracking-tight">REST API & Monitoring</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  Secure built-in Express REST API providing real-time data feeds, query profiling, and remote module management.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-16 text-xs font-mono text-neutral-500 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span>© 2026 Pegasus Bot. All rights reserved.</span>
            <span className="text-white/20">|</span>
            <a href="https://vaultscope.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Sponsored by VaultScope</a>
          </div>
          <div className="flex items-center gap-8">
            <a href="https://cptcr.uk" target="_blank" rel="noopener noreferrer" className="hover:text-[#5E5CE6] transition-colors">Developer</a>
            <a href="https://discord.gg/vaultscope" target="_blank" rel="noopener noreferrer" className="hover:text-[#5E5CE6] transition-colors">Support Server</a>
            <a href="https://github.com/semi-constructor/pegasus" target="_blank" rel="noopener noreferrer" className="hover:text-[#5E5CE6] transition-colors">GitHub</a>
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-[#5E5CE6] transition-colors">Privacy</a>
            <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-[#5E5CE6] transition-colors">Terms of Service</a>
            <a href="/tech" target="_blank" rel="noopener noreferrer" className="hover:text-[#5E5CE6] transition-colors">Technologies</a>
            <a href="/sponsors" className="hover:text-[#5E5CE6] transition-colors">Sponsors</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
