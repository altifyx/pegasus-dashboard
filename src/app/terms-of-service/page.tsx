import React from 'react';
import Link from 'next/link';
import { Shield, FileText, CheckCircle2, AlertCircle, Scale, Terminal, ArrowLeft } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col selection:bg-[#5E5CE6]/30 selection:text-white">
      {/* Navigation */}
      <header className="border-b border-white/5 backdrop-blur-md bg-black/50 sticky top-0 z-50">
        <div className="max-w-7xl w-full mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-2.5 h-2.5 bg-[#5E5CE6] shadow-[0_0_15px_#5E5CE6] group-hover:opacity-80 transition-opacity" />
            <span className="font-mono text-sm tracking-widest font-bold uppercase text-white">Pegasus // Legal</span>
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
              <Scale className="w-4 h-4" />
              <span>LEGAL // TERMS OF SERVICE</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white uppercase font-sans">
              Terms of Service
            </h1>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-sans">
              These Terms of Service govern your access to and use of the Pegasus Discord Bot, web dashboard, and associated APIs. By inviting Pegasus or accessing our control panel, you agree to abide by these operating stipulations.
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
              <FileText className="w-6 h-6 text-[#5E5CE6]" />
              <h2 className="text-xl md:text-2xl font-bold text-white font-sans uppercase tracking-tight">
                1. Acceptance of Terms
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-mono">
              By adding the Pegasus Bot to your Discord server or connecting your Discord account to the Pegasus web portal, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms. If you do not agree with any provision, you must immediately remove the bot and cease dashboard access.
            </p>
          </div>

          {/* Section 2 */}
          <div className="border border-white/10 bg-white/[0.01] p-8 md:p-12 backdrop-blur-md relative overflow-hidden space-y-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#5E5CE6]" />
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <Shield className="w-6 h-6 text-[#5E5CE6]" />
              <h2 className="text-xl md:text-2xl font-bold text-white font-sans uppercase tracking-tight">
                2. Acceptable Use & Conduct
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-mono">
              You agree to use Pegasus strictly in compliance with Discord's official Developer Terms of Service and Community Guidelines. Furthermore, you expressly agree not to:
            </p>
            <ul className="space-y-3 pt-2 text-xs md:text-sm text-neutral-300 font-mono border-l border-[#5E5CE6]/40 pl-6">
              <li className="flex items-start gap-2.5">
                <span className="text-[#5E5CE6] mt-0.5 select-none">▪</span>
                <span><strong className="text-white">API Abuse & Flood:</strong> Employ automated scripts, scrapers, or botnets to flood our REST Core API or intentionally trigger rate limit violations.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#5E5CE6] mt-0.5 select-none">▪</span>
                <span><strong className="text-white">Malicious Automation:</strong> Configure AutoMod V2 or warning triggers to harass, defame, or execute malicious operations against external servers or individuals.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#5E5CE6] mt-0.5 select-none">▪</span>
                <span><strong className="text-white">Reverse Engineering:</strong> Attempt to decompile, decipher, or reverse engineer the internal algorithms governing our Drizzle ORM mutations and economy cache matrices.</span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="border border-white/10 bg-white/[0.01] p-8 md:p-12 backdrop-blur-md relative overflow-hidden space-y-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#5E5CE6]" />
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <Terminal className="w-6 h-6 text-[#5E5CE6]" />
              <h2 className="text-xl md:text-2xl font-bold text-white font-sans uppercase tracking-tight">
                3. Service Availability & Modifications
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-mono">
              We continually upgrade and refine Pegasus to maintain peak performance across Cloudflare and Neon infrastructure. We reserve the right to modify, suspend, or discontinue specific module features (such as experimental gambling commands or JTC voice allocation schemes) at any time without prior notice.
            </p>
          </div>

          {/* Section 4 */}
          <div className="border border-white/10 bg-white/[0.01] p-8 md:p-12 backdrop-blur-md relative overflow-hidden space-y-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#5E5CE6]" />
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <AlertCircle className="w-6 h-6 text-[#5E5CE6]" />
              <h2 className="text-xl md:text-2xl font-bold text-white font-sans uppercase tracking-tight">
                4. Limitation of Liability
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-mono">
              PEGASUS IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. UNDER NO CIRCUMSTANCES SHALL PEGASUS OR ITS CREATORS BE HELD LIABLE FOR ANY INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES RESULTING FROM DATA DISCORD OUTAGES, CONFIGURATION MISTAKES, OR UNINTENDED AUTOMOD V2 ACTIONS.
            </p>
            <p className="text-xs md:text-sm text-neutral-500 font-mono pt-4 border-t border-white/5">
              Last Updated: June 2026. These terms are governed by applicable multi-jurisdictional digital commerce laws.
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
