import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { Terminal, Server, Cpu, ExternalLink, Shield, Layers, Globe, ArrowLeft } from 'lucide-react';

interface TechItem {
  name: string;
  url: string;
  description: string;
}

interface TechSection {
  title: string;
  items: TechItem[];
}

export default async function TechPage() {
  let content = '';
  try {
    const filePath = path.join(process.cwd(), 'TECH.md');
    content = await fs.readFile(filePath, 'utf8');
  } catch (e) {
    // Fallback if TECH.md is unavailable
    content = `# Infrastructure\n## Cloudflare\nURL: cloudflare.com\nCloudflare is used to host the dashboard, secure tunnels to reach the discord bot and host and register our domains.\n## Neon Database\nURL: neon.com\nNeon is a serverless and open-source alternative to AWS Aurora.\n## GitHub\nURL: github.com\nGitHub is used by us to share the source code of Pegasus worldwide.\n\n# Technologies\n## TypeScript\nURL: typescriptlang.org\nTypeScript is the primary coding language for both the bot and the dashboard.\n## Node.js\nURL: nodejs.org\nNode.js is the JavaScript runtime that powers both the bot and the dashboard.\n## Next.js\nURL: nextjs.org\nNext.js is the core framework behind the dashboard.`;
  }

  // Parse TECH.md into structured sections
  const lines = content.split('\n');
  const sections: TechSection[] = [];
  let currentSection: TechSection | null = null;
  let currentItem: TechItem | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('# ')) {
      if (currentSection) {
        if (currentItem) currentSection.items.push(currentItem);
        sections.push(currentSection);
        currentItem = null;
      }
      currentSection = {
        title: line.slice(2).trim(),
        items: []
      };
      continue;
    }

    if (line.startsWith('## ')) {
      if (currentSection && currentItem) {
        currentSection.items.push(currentItem);
      }
      currentItem = {
        name: line.slice(3).trim(),
        url: '',
        description: ''
      };
      continue;
    }

    if (line.startsWith('URL:')) {
      if (currentItem) {
        let url = line.slice(4).trim();
        if (!url.startsWith('http')) url = 'https://' + url;
        currentItem.url = url;
      }
      continue;
    }

    // Otherwise it's description
    if (currentItem) {
      currentItem.description += (currentItem.description ? ' ' : '') + line;
    }
  }

  if (currentSection) {
    if (currentItem) currentSection.items.push(currentItem);
    sections.push(currentSection);
  }

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col selection:bg-[#5E5CE6]/30 selection:text-white">
      {/* Navigation */}
      <header className="border-b border-white/5 backdrop-blur-md bg-black/50 sticky top-0 z-50">
        <div className="max-w-7xl w-full mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-2.5 h-2.5 bg-[#5E5CE6] shadow-[0_0_15px_#5E5CE6] group-hover:opacity-80 transition-opacity" />
            <span className="font-mono text-sm tracking-widest font-bold uppercase text-white">Pegasus // Tech</span>
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
              <Cpu className="w-4 h-4" />
              <span>SYSTEM INFRASTRUCTURE & TECH STACK</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white uppercase font-sans">
              Powering Pegasus
            </h1>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-sans">
              An architectural breakdown of the cloud-native infrastructure, serverless databases, runtime environments, and strict type systems powering the Pegasus Discord Bot and web dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Sections Grid */}
      <section className="py-16 px-6 bg-black">
        <div className="max-w-7xl mx-auto w-full space-y-20">
          {sections.map((section, sIdx) => (
            <div key={section.title} className="space-y-8">
              <div className="border-b border-white/5 pb-4 flex items-center gap-3">
                <div className="p-2 border border-[#5E5CE6]/40 bg-[#5E5CE6]/10 text-[#5E5CE6]">
                  {sIdx === 0 ? <Server className="w-5 h-5" /> : <Terminal className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white font-sans uppercase tracking-tight">{section.title}</h2>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest mt-0.5">
                    {section.items.length} {section.items.length === 1 ? 'Entity' : 'Entities'} Mapped
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="border border-white/10 bg-white/[0.01] p-8 flex flex-col justify-between hover:border-[#5E5CE6] hover:bg-[#5E5CE6]/[0.02] transition-all group rounded-none backdrop-blur-md relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#5E5CE6]/60 group-hover:bg-[#5E5CE6] transition-colors" />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#5E5CE6] tracking-wider uppercase">
                          <Layers className="w-4 h-4" />
                          <span>{item.name}</span>
                        </div>
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-500 hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white font-sans tracking-tight">{item.name}</h3>
                      <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                        {item.description}
                      </p>
                    </div>

                    {item.url && (
                      <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[10px] text-[#5E5CE6] uppercase tracking-wider font-semibold">
                        <span className="truncate pr-2">{item.url.replace('https://', '')}</span>
                        <span>[ VISIT ]</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
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
