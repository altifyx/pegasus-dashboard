import React from 'react';
import Link from 'next/link';
import { Shield, CheckCircle2, Lock, FileText, Database, Eye, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col selection:bg-[#5E5CE6]/30 selection:text-white">
      {/* Navigation */}
      <header className="border-b border-white/5 backdrop-blur-md bg-black/50 sticky top-0 z-50">
        <div className="max-w-7xl w-full mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-2.5 h-2.5 bg-[#5E5CE6] shadow-[0_0_15px_#5E5CE6] group-hover:opacity-80 transition-opacity" />
            <span className="font-mono text-sm tracking-widest font-bold uppercase text-white">Pegasus // Privacy</span>
          </Link>
          <div className="flex items-center gap-6 text-xs font-mono tracking-wider">
            <Link href="/" className="hover:text-[#5E5CE6] transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>System Home</span>
            </Link>
            <Link href="/docs" className="hover:text-[#5E5CE6] transition-colors">Documentation</Link>
            <Link href="/dashboard" className="border border-white/10 px-4 py-2 hover:border-[#5E5CE6] hover:text-[#5E5CE6] transition-all rounded-none bg-white/[0.02]">
              Access Dashboard
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-black text-neutral-100 font-mono">
      {/* Header Section */}
      <section className="border-b border-white/5 bg-black py-16 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 text-[#5E5CE6] text-xs uppercase tracking-widest font-semibold">
              <Shield className="w-4 h-4" />
              <span>LEGAL // PRIVACY POLICY</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white uppercase font-sans">
              Privacy Policy
            </h1>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-sans">
              We are strictly committed to transparency, minimal data collection, and uncompromising security. This policy outlines exactly what information we collect, how it is secured, and your complete ownership over your Discord server data.
            </p>
          </div>
        </div>
      </section>

      {/* Body Section */}
      <section className="py-16 px-6 bg-black">
        <div className="max-w-4xl mx-auto w-full space-y-16">
          {/* Section 1 */}
          <div className="border border-white/10 bg-white/[0.01] p-8 md:p-12 backdrop-blur-md relative overflow-hidden space-y-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#5E5CE6]" />
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <Database className="w-6 h-6 text-[#5E5CE6]" />
              <h2 className="text-xl md:text-2xl font-bold text-white font-sans uppercase tracking-tight">
                1. Data We Collect
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-mono">
              Pegasus operates on a principle of absolute data minimization. When you invite Pegasus to your Discord server or log into our web dashboard, we collect only the necessary data required to operate core bot features (such as moderation logs, leveling systems, and economy ledgers).
            </p>
            <ul className="space-y-3 pt-2 text-xs md:text-sm text-neutral-300 font-mono border-l border-[#5E5CE6]/40 pl-6">
              <li className="flex items-start gap-2.5">
                <span className="text-[#5E5CE6] mt-0.5 select-none">▪</span>
                <span><strong className="text-white">Discord IDs:</strong> Guild IDs, User IDs, Channel IDs, and Role IDs required to map configuration parameters and verify administrative permissions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#5E5CE6] mt-0.5 select-none">▪</span>
                <span><strong className="text-white">Persistent Configurations:</strong> Settings you explicitly establish via slash commands or dashboard inputs (e.g., custom prefix, automated warning rules, ticket panels).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#5E5CE6] mt-0.5 select-none">▪</span>
                <span><strong className="text-white">Interaction Metrics:</strong> Minimal audit logs and command execution frequencies required for rate limiting and AutoMod V2 quarantine operations.</span>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="border border-white/10 bg-white/[0.01] p-8 md:p-12 backdrop-blur-md relative overflow-hidden space-y-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#5E5CE6]" />
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <Lock className="w-6 h-6 text-[#5E5CE6]" />
              <h2 className="text-xl md:text-2xl font-bold text-white font-sans uppercase tracking-tight">
                2. Data Storage & Encryption
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-mono">
              All structured relational entities are stored in secure, serverless PostgreSQL databases provided by <strong className="text-white">Neon</strong>. Our infrastructure utilizes state-of-the-art encryption at rest and in transit.
            </p>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-mono">
              Authentication sessions established via Discord OAuth2 are cryptographically signed and verified using HttpOnly secure cookies. We never store raw access credentials or private Discord authorization tokens in accessible database records.
            </p>
          </div>

          {/* Section 3 */}
          <div className="border border-white/10 bg-white/[0.01] p-8 md:p-12 backdrop-blur-md relative overflow-hidden space-y-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#5E5CE6]" />
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <Eye className="w-6 h-6 text-[#5E5CE6]" />
              <h2 className="text-xl md:text-2xl font-bold text-white font-sans uppercase tracking-tight">
                3. Data Sharing & Third Parties
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-mono">
              We strictly <strong className="text-white">never sell, rent, or distribute</strong> your Discord server data, user profiles, or messaging habits to advertisers, data brokers, or third-party marketing entities. Data is solely processed within our core Cloudflare and Neon compute environments to deliver the bot functionality you explicitly requested.
            </p>
          </div>

          {/* Section 4 */}
          <div className="border border-white/10 bg-white/[0.01] p-8 md:p-12 backdrop-blur-md relative overflow-hidden space-y-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#5E5CE6]" />
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <FileText className="w-6 h-6 text-[#5E5CE6]" />
              <h2 className="text-xl md:text-2xl font-bold text-white font-sans uppercase tracking-tight">
                4. Your Rights & Data Deletion
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-mono">
              As a server owner, you hold absolute authority over your data. Upon removing Pegasus from your Discord guild or initiating a complete reset command, all guild-specific settings, custom ticket layouts, and warning automations are flagged for complete deletion from our PostgreSQL tables.
            </p>
            <p className="text-xs md:text-sm text-neutral-500 font-mono pt-4 border-t border-white/5">
              Last Updated: June 2026. For questions regarding privacy or GDPR compliance inquiries, contact our master support channel.
            </p>
          </div>
        </div>
      </section>
      </main>
      {/* Footer */}
      <footer className="border-t border-white/5 py-16 text-xs font-mono text-neutral-500 bg-black">
        <div className="max-w-7xl w-full mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span>© 2026 Pegasus Bot. All rights reserved.</span>
            <span className="text-white/20">|</span>
            <a href="https://vaultscope.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Sponsored by VaultScope</a>
          </div>
          <div className="flex items-center gap-8">
            <a href="https://cptcr.uk" target="_blank" rel="noopener noreferrer" className="hover:text-[#5E5CE6] transition-colors">Developer</a>
            <a href="https://discord.gg/vaultscope" target="_blank" rel="noopener noreferrer" className="hover:text-[#5E5CE6] transition-colors">Support Server</a>
            <Link href="/source" className="hover:text-[#5E5CE6] transition-colors">Source Code</Link>
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
