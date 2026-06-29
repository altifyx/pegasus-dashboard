import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import AdminMarkdownViewer from '@/components/AdminMarkdownViewer';

export default async function AdminApiDocsPage() {
  let content = '';
  try {
    const filePath = path.join(process.cwd(), 'API_DOC.md');
    content = await fs.readFile(filePath, 'utf8');
  } catch (e) {
    content = '# Error Loading API_DOC.md\n\nUnable to read `API_DOC.md` from the root directory. Ensure the file exists and permissions are granted.';
  }

  return (
    <AdminMarkdownViewer
      content={content}
      title="REST API Architecture"
      subtitle="Complete specification of all Express HTTP REST endpoints, authentication schemas, rate limit tiers, and cache TTL policies."
      badge="Express REST Specification"
    />
  );
}
