import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col selection:bg-[#5E5CE6]/30 selection:text-white">
      {/* Navigation */}
      <header className="border-b border-white/5 backdrop-blur-md bg-black/50 sticky top-0 z-50">
        <div className="max-w-7xl w-full mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-2.5 h-2.5 bg-[#5E5CE6] shadow-[0_0_15px_#5E5CE6] group-hover:opacity-80 transition-opacity" />
            <span className="font-mono text-sm tracking-widest font-bold uppercase text-white">Pegasus // Docs</span>
          </Link>
          <div className="flex items-center gap-6 text-xs font-mono tracking-wider">
            <Link href="/" className="hover:text-[#5E5CE6] transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>System Home</span>
            </Link>
            <Link href="/docs/commands" className="text-[#5E5CE6]">
              Commands
            </Link>
            <Link href="/dashboard" className="border border-white/10 px-4 py-2 hover:border-[#5E5CE6] hover:text-[#5E5CE6] transition-all rounded-none bg-white/[0.02]">
              Access Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>

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
