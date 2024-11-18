// src/app/editor/page.tsx
'use client';

import React, { useState } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import rehypeReact from 'rehype-react';
import 'highlight.js/styles/github-dark.css';
import '@/app/globals.css';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';

import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';

export default function EditorPage() {
  // Frontmatter state variables
  const [title, setTitle] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState('');

  const [markdownInput, setMarkdownInput] = useState<string>('');

  // Combine frontmatter and markdown input
  const combinedMarkdown = `---
title: "${title}"
publishedAt: "${publishedAt}"
summary: "${summary}"
tags: [${tags}]
image: "${image}"
---

${markdownInput}`;

  // Process the markdown input
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml']) // Parses frontmatter
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(
      rehypeHighlight,
      {
        languages: {
          javascript: javascript,
          typescript: typescript,
          // Add other languages here
        },
      }
    )
    .use(rehypeReact, {
      jsx: jsx,
      jsxs: jsxs,
      Fragment: Fragment,
    });

  const result = processor.processSync(combinedMarkdown);
  const content = result.result;

  const handleExport = () => {
    const blob = new Blob([combinedMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_markdown.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="border-b p-4">
        <h1 className="text-2xl font-semibold">Markdown Editor</h1>
      </header>
      <div className="flex flex-row flex-grow overflow-hidden">
        {/* Left Column: Export Button and Frontmatter Inputs */}
        <div className="w-1/3 p-4 flex flex-col space-y-4 flex-shrink-0">
          {/* Export Button */}
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Export Markdown
          </button>

          {/* Frontmatter Inputs */}
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full border border-input rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Published At</label>
              <input
                type="date"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="mt-1 block w-full border border-input rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Summary</label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="mt-1 block w-full border border-input rounded-md p-2"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium">Tags (comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="mt-1 block w-full border border-input rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="mt-1 block w-full border border-input rounded-md p-2"
              />
            </div>
          </div>
        </div>
        {/* Right Column: Markdown Editor and Preview */}
        <div className="w-2/3 flex flex-col flex-grow overflow-hidden">
          <div className="p-4 flex-grow">
            <textarea
              value={markdownInput}
              onChange={(e) => setMarkdownInput(e.target.value)}
              className="w-full h-full p-4 rounded-md border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
              placeholder="Write your markdown here..."
            ></textarea>
          </div>
          <div className="p-4 flex-grow overflow-auto">
            <div className="rounded-md border bg-card text-card-foreground shadow-sm p-6 h-full">
              <article className="prose dark:prose-invert max-w-none">
                {content}
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}