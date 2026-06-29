import React from 'react';
import Link from 'next/link';
import { Shield, Sparkles, ArrowRight, ArrowLeft, Heart, Terminal, Cpu } from 'lucide-react';

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col selection:bg-[#5E5CE6]/30 selection:text-white">
      {/* Navigation */}
      <header className="border-b border-white/5 backdrop-blur-md bg-black/50 sticky top-0 z-50">
        <div className="max-w-7xl w-full mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-2.5 h-2.5 bg-[#5E5CE6] shadow-[0_0_15px_#5E5CE6] group-hover:opacity-80 transition-opacity" />
            <span className="font-mono text-sm tracking-widest font-bold uppercase text-white">Pegasus // Sponsors</span>
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

      {/* Main Content */}
      <main className="flex-1 bg-black text-neutral-100 font-mono">
        {/* Header Section */}
        <section className="border-b border-white/5 bg-black py-16 px-6">
          <div className="max-w-7xl mx-auto w-full">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-2 text-[#5E5CE6] text-xs uppercase tracking-widest font-semibold">
                <Heart className="w-4 h-4" />
                <span>SUPPORT // BACK THE PROJECT</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white uppercase font-sans">
                Pegasus Sponsors
              </h1>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-sans">
                Pegasus is an open-source, high-performance Discord bot dedicated to absolute transparency and customizability. Backing our project directly fuels serverless infrastructure, low-latency compute tiers, and continuous development.
              </p>
            </div>
          </div>
        </section>

        {/* Sponsors Tier / Empty State Section */}
        <section className="py-24 px-6 bg-black">
          <div className="max-w-5xl mx-auto w-full space-y-16">
            {/* Elegant Empty State */}
            <div className="border border-white/10 bg-white/[0.01] p-12 md:p-16 backdrop-blur-md relative overflow-hidden flex flex-col items-center text-center space-y-8 rounded-none group hover:border-[#5E5CE6]/40 transition-all">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#5E5CE6]" />
              <div className="p-4 border border-[#5E5CE6]/40 bg-[#5E5CE6]/10 text-[#5E5CE6]">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>
              <div className="space-y-3 max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-sans uppercase tracking-tight">
                  Become Our First Platinum Sponsor
                </h2>
                <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-mono">
                  We are currently welcoming our inaugural cohort of financial backers and corporate partners. Sponsors receive prominent logo placement across our web control plane, dedicated audit log shoutouts, and high-priority custom module support.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <a
                  href="https://github.com/sponsors/semi-constructor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-[#5E5CE6]/40 border-l-2 border-l-[#5E5CE6] bg-[#5E5CE6]/10 px-8 py-4 text-xs font-mono text-[#5E5CE6] hover:bg-[#5E5CE6] hover:text-black transition-all rounded-none uppercase tracking-widest font-bold group/btn"
                >
                  <span>Sponsor on GitHub</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
                <a
                  href="https://discord.gg/vaultscope"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/10 px-8 py-4 text-xs font-mono text-neutral-300 hover:border-white/20 transition-colors rounded-none bg-white/[0.02] uppercase tracking-widest font-bold"
                >
                  Contact Business Inquiry
                </a>
              </div>
            </div>

            {/* Why Sponsor / Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="border border-white/5 bg-white/[0.005] p-8 space-y-4">
                <div className="text-[#5E5CE6]">
                  <Terminal className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-sans uppercase">Infrastructure Scaling</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-mono">
                  Guarantees robust Cloudflare enterprise tunnel stability and dedicated Neon PostgreSQL compute allocation for heavy guild shards.
                </p>
              </div>

              <div className="border border-white/5 bg-white/[0.005] p-8 space-y-4">
                <div className="text-emerald-400">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-sans uppercase">High-Priority Module Dev</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-mono">
                  Sponsors can request specialized bot capabilities, advanced telemetry hooks, and customized ticketing layouts.
                </p>
              </div>

              <div className="border border-white/5 bg-white/[0.005] p-8 space-y-4">
                <div className="text-amber-400">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-sans uppercase">Brand Visibility</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-mono">
                  Your brand featured on our landing page, public documentation, and administrative control panels viewed by server owners worldwide.
                </p>
              </div>
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
