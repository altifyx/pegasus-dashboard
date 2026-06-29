import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import AdminMarkdownViewer from '@/components/AdminMarkdownViewer';

export default async function AdminCommandsDocsPage() {
  let content = '';
  try {
    const filePath = path.join(process.cwd(), 'COMMANDS_DOC.md');
    content = await fs.readFile(filePath, 'utf8');
  } catch (e) {
    content = '# Error Loading COMMANDS_DOC.md\n\nUnable to read `COMMANDS_DOC.md` from the root directory. Ensure the file exists and permissions are granted.';
  }

  return (
    <AdminMarkdownViewer
      content={content}
      title="System Command Matrix"
      subtitle="Exhaustive reference for all slash commands, subcommands, parameter schemas, and role permission hierarchies."
      badge="Slash Command Hierarchy"
    />
  );
}
