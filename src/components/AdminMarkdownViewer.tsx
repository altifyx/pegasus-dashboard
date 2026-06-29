import React from 'react';
import { Terminal, FileText, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

interface AdminMarkdownViewerProps {
  content: string;
  title: string;
  subtitle: string;
  badge: string;
}

export default function AdminMarkdownViewer({ content, title, subtitle, badge }: AdminMarkdownViewerProps) {
  // Parse markdown content into beautiful structured sections
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let currentCodeBlock: { language: string; lines: string[] } | null = null;
  let currentList: { items: string[] } | null = null;
  let currentTable: { headers: string[]; rows: string[][] } | null = null;

  const flushList = (key: number) => {
    if (currentList && currentList.items.length > 0) {
      elements.push(
        <ul key={`list_${key}`} className="space-y-2 my-4 pl-4 border-l border-[#5E5CE6]/40">
          {currentList.items.map((item, i) => (
            <li key={i} className="text-xs text-neutral-300 font-mono flex items-start gap-2.5">
              <span className="text-[#5E5CE6] mt-0.5 select-none">▪</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            </li>
          ))}
        </ul>
      );
      currentList = null;
    }
  };

  const flushTable = (key: number) => {
    if (currentTable) {
      elements.push(
        <div key={`table_${key}`} className="my-6 overflow-x-auto custom-scrollbar border border-white/10 bg-white/[0.01]">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-neutral-400 uppercase tracking-wider text-[10px]">
                {currentTable.headers.map((h, i) => (
                  <th key={i} className="p-4 py-3" dangerouslySetInnerHTML={{ __html: formatInline(h) }} />
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-neutral-300">
              {currentTable.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-4 py-3.5" dangerouslySetInnerHTML={{ __html: formatInline(cell) }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTable = null;
    }
  };

  const formatInline = (text: string) => {
    return text
      .replace(/`([^`]+)`/g, '<code class="bg-[#5E5CE6]/10 text-[#5E5CE6] border border-[#5E5CE6]/20 px-1.5 py-0.5 text-[11px] font-mono">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em class="text-neutral-200 italic">$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#5E5CE6] hover:underline inline-flex items-center gap-1">$1</a>');
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Inside a Code Block
    if (currentCodeBlock) {
      if (trimmed.startsWith('```')) {
        elements.push(
          <div key={`code_${i}`} className="my-6 border border-white/10 bg-[#0c0c0e] relative overflow-hidden font-mono text-xs rounded-none shadow-xl">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02] text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#5E5CE6]" />
                <span>{currentCodeBlock.language || 'text'}</span>
              </div>
              <span>[ CODE_SNIPPET ]</span>
            </div>
            <pre className="p-4 overflow-x-auto custom-scrollbar text-neutral-300 font-mono text-xs leading-relaxed">
              <code>{currentCodeBlock.lines.join('\n')}</code>
            </pre>
          </div>
        );
        currentCodeBlock = null;
      } else {
        currentCodeBlock.lines.push(line);
      }
      continue;
    }

    // Start Code Block
    if (trimmed.startsWith('```')) {
      flushList(i);
      flushTable(i);
      currentCodeBlock = {
        language: trimmed.slice(3).trim(),
        lines: [],
      };
      continue;
    }

    // Horizontal Rule
    if (trimmed === '---') {
      flushList(i);
      flushTable(i);
      elements.push(<hr key={`hr_${i}`} className="my-10 border-t border-white/5" />);
      continue;
    }

    // Headings
    if (trimmed.startsWith('#')) {
      flushList(i);
      flushTable(i);
      const level = trimmed.match(/^#+/)?.[0].length || 1;
      const text = trimmed.replace(/^#+\s*/, '');

      if (level === 1) {
        elements.push(
          <h1 key={`h1_${i}`} className="text-2xl md:text-3xl font-bold text-white font-sans uppercase tracking-tight mt-12 mb-6 pb-4 border-b border-white/10">
            {text}
          </h1>
        );
      } else if (level === 2) {
        elements.push(
          <h2 key={`h2_${i}`} className="text-xl md:text-2xl font-bold text-white font-sans uppercase tracking-tight mt-10 mb-4 flex items-center gap-3">
            <span className="w-2 h-6 bg-[#5E5CE6] inline-block" />
            <span>{text}</span>
          </h2>
        );
      } else {
        elements.push(
          <h3 key={`h3_${i}`} className="text-base md:text-lg font-semibold text-[#5E5CE6] font-sans tracking-wide mt-8 mb-3 flex items-center gap-2">
            <span className="text-neutral-500 font-mono text-sm">///</span>
            <span>{text}</span>
          </h3>
        );
      }
      continue;
    }

    // Tables
    if (trimmed.startsWith('|')) {
      flushList(i);
      const parts = trimmed.split('|').slice(1, -1).map(s => s.trim());
      if (!currentTable) {
        currentTable = {
          headers: parts,
          rows: [],
        };
        // Skip separator line if next line is `|:---|`
        if (lines[i + 1] && lines[i + 1].trim().startsWith('|') && lines[i + 1].includes('---')) {
          i++;
        }
      } else {
        currentTable.rows.push(parts);
      }
      continue;
    } else {
      flushTable(i);
    }

    // List Items
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!currentList) currentList = { items: [] };
      currentList.items.push(trimmed.slice(2));
      continue;
    } else {
      flushList(i);
    }

    // Paragraphs / Normal text
    if (trimmed.length > 0) {
      elements.push(
        <p key={`p_${i}`} className="text-xs md:text-sm text-neutral-400 font-mono leading-relaxed my-3" dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} />
      );
    }
  }

  flushList(lines.length);
  flushTable(lines.length);

  return (
    <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-12 font-mono">
      {/* Document Header Banner */}
      <div className="border-b border-white/5 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 border border-amber-500/20 px-3 py-1 bg-amber-500/10 mb-4 text-xs tracking-wide text-amber-400 font-mono">
            <FileText className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>
          <h1 className="text-4xl font-light tracking-tight text-white mb-2 font-sans uppercase">{title}</h1>
          <p className="text-sm text-neutral-400 tracking-wide font-mono">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Rendered Markdown Body */}
      <div className="border border-white/10 bg-white/[0.01] p-8 md:p-12 backdrop-blur-md relative overflow-hidden space-y-2">
        <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
        {elements}
      </div>
    </main>
  );
}
