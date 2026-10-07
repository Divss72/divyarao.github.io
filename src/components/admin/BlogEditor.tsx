import React, { useState } from 'react';
import { BlogPost } from '../../types';
import { portfolioStore } from '../../data/store';

interface BlogEditorProps {
  initialBlog?: BlogPost;
  onSave: () => void;
  onCancel: () => void;
}

export const BlogEditor: React.FC<BlogEditorProps> = ({ initialBlog, onSave, onCancel }) => {
  const [title, setTitle] = useState(initialBlog?.title || '');
  const [slug, setSlug] = useState(initialBlog?.slug || '');
  const [category, setCategory] = useState<BlogPost['category']>(initialBlog?.category || 'AI & LLMs');
  const [tags, setTags] = useState(initialBlog?.tags.join(', ') || 'Agentic AI, Systems');
  const [excerpt, setExcerpt] = useState(initialBlog?.excerpt || '');
  const [readTime, setReadTime] = useState(initialBlog?.readTime || '5 min read');
  const [content, setContent] = useState(
    initialBlog?.content ||
      '### Subtitle Here\n\nWrite your thoughts, technical architecture breakdowns, and code snippets here...\n\n```typescript\n// Code sample\nconsole.log("Hello from Divya");\n```\n'
  );
  const [isDraft, setIsDraft] = useState(initialBlog?.isDraft || false);
  const [previewTab, setPreviewTab] = useState<'write' | 'preview'>('write');

  // Auto-generate slug from title if new
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialBlog) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  };

  const insertSnippet = (prefix: string, suffix: string = '') => {
    setContent((prev) => prev + prefix + ' ' + suffix);
  };

  const handleSave = (publishState: boolean) => {
    if (!title.trim() || !slug.trim()) {
      alert('Please provide at least a title and slug.');
      return;
    }

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      category,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      excerpt: excerpt.trim(),
      readTime,
      content,
      publishDate: initialBlog?.publishDate || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      isDraft: publishState,
      seoTitle: `${title.trim()} — Divya Rao`,
      seoDescription: excerpt.trim(),
    };

    if (initialBlog) {
      portfolioStore.updateBlog(initialBlog.id, payload);
    } else {
      portfolioStore.addBlog(payload);
    }

    onSave();
  };

  return (
    <div className="p-6 sm:p-8 bg-cream-50 rounded-2xl border border-beige-dark/70 shadow-warm-lg space-y-6 text-coffee-espresso font-mono text-xs">
      <div className="flex items-center justify-between pb-4 border-b border-beige/60">
        <div>
          <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
            // CMS WRITER
          </span>
          <h3 className="font-editorial text-2xl font-bold">
            {initialBlog ? 'Edit Chronicled Post' : 'Compose New Article'}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCancel}
            className="px-3.5 py-1.5 rounded-lg border border-beige-dark/50 text-coffee-muted hover:text-coffee-espresso hover:bg-beige/30 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSave(true)}
            className="px-3.5 py-1.5 rounded-lg border border-coffee text-coffee hover:bg-coffee/10 transition cursor-pointer"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(false)}
            className="px-4 py-1.5 rounded-lg bg-coffee text-cream-50 hover:bg-coffee-roast font-bold transition shadow-warm-sm cursor-pointer"
          >
            Publish Live ✦
          </button>
        </div>
      </div>

      {/* Metadata Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] text-coffee-muted uppercase tracking-wider mb-1 font-semibold">
            Post Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. Architecting Distributed Self-Healing Workflows"
            className="w-full bg-cream-100 border border-beige-dark/50 rounded-lg px-3.5 py-2.5 text-coffee-espresso text-xs font-mono focus:outline-none focus:border-coffee transition"
          />
        </div>

        <div>
          <label className="block text-[10px] text-coffee-muted uppercase tracking-wider mb-1 font-semibold">
            Clean URL Slug * (e.g. /blog/[slug])
          </label>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="architecting-distributed-self-healing"
            className="w-full bg-cream-100 border border-beige-dark/50 rounded-lg px-3.5 py-2.5 text-coffee-espresso text-xs font-mono focus:outline-none focus:border-coffee transition"
          />
        </div>

        <div>
          <label className="block text-[10px] text-coffee-muted uppercase tracking-wider mb-1 font-semibold">
            Category Cluster
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full bg-cream-100 border border-beige-dark/50 rounded-lg px-3.5 py-2.5 text-coffee-espresso text-xs font-mono focus:outline-none focus:border-coffee transition"
          >
            <option value="AI & LLMs">AI & LLMs</option>
            <option value="Distributed Systems">Distributed Systems</option>
            <option value="Algorithms">Algorithms</option>
            <option value="Web Engineering">Web Engineering</option>
            <option value="Life & Books">Life & Books</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-coffee-muted uppercase tracking-wider mb-1 font-semibold">
            Tags (Comma-separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Agentic AI, Prometheus, Indexing"
            className="w-full bg-cream-100 border border-beige-dark/50 rounded-lg px-3.5 py-2.5 text-coffee-espresso text-xs font-mono focus:outline-none focus:border-coffee transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] text-coffee-muted uppercase tracking-wider mb-1 font-semibold">
          Excerpt / Search Abstract
        </label>
        <textarea
          rows={2}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief 1-2 sentence teaser for readers and search engine snippets..."
          className="w-full bg-cream-100 border border-beige-dark/50 rounded-lg px-3.5 py-2.5 text-coffee-espresso text-xs font-sans focus:outline-none focus:border-coffee transition resize-none"
        />
      </div>

      {/* Editor Toolbar */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 bg-cream-100 p-2 rounded-xl border border-beige/60">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => insertSnippet('### Heading')}
              className="px-2 py-1 bg-cream-50 rounded border border-beige-dark/40 hover:bg-beige/30"
            >
              H3
            </button>
            <button
              onClick={() => insertSnippet('**Bold Text**')}
              className="px-2 py-1 bg-cream-50 rounded border border-beige-dark/40 hover:bg-beige/30 font-bold"
            >
              B
            </button>
            <button
              onClick={() => insertSnippet('*Italic Text*')}
              className="px-2 py-1 bg-cream-50 rounded border border-beige-dark/40 hover:bg-beige/30 italic"
            >
              I
            </button>
            <button
              onClick={() => insertSnippet('```typescript\n// code here\n```')}
              className="px-2 py-1 bg-cream-50 rounded border border-beige-dark/40 hover:bg-beige/30"
            >
              Code Block
            </button>
            <button
              onClick={() => insertSnippet('> Quotation block')}
              className="px-2 py-1 bg-cream-50 rounded border border-beige-dark/40 hover:bg-beige/30"
            >
              Quote
            </button>
            <button
              onClick={() => insertSnippet('[Link text](https://)')}
              className="px-2 py-1 bg-cream-50 rounded border border-beige-dark/40 hover:bg-beige/30"
            >
              Link
            </button>
          </div>

          <div className="flex items-center gap-1 bg-cream-50 p-1 rounded-lg border border-beige-dark/40">
            <button
              onClick={() => setPreviewTab('write')}
              className={`px-3 py-1 rounded transition ${
                previewTab === 'write' ? 'bg-coffee text-cream-50 font-bold' : 'text-coffee-muted'
              }`}
            >
              Write
            </button>
            <button
              onClick={() => setPreviewTab('preview')}
              className={`px-3 py-1 rounded transition ${
                previewTab === 'preview' ? 'bg-coffee text-cream-50 font-bold' : 'text-coffee-muted'
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        {/* Content input or Preview */}
        {previewTab === 'write' ? (
          <textarea
            rows={14}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write in Markdown syntax..."
            className="w-full bg-cream-100 border border-beige-dark/50 rounded-xl p-4 text-coffee-espresso text-xs font-mono focus:outline-none focus:border-coffee transition leading-relaxed"
          />
        ) : (
          <div className="min-h-[300px] p-6 bg-cream-50 rounded-xl border border-beige-dark/50 font-sans text-sm space-y-4 whitespace-pre-line leading-relaxed text-coffee-espresso">
            {content}
          </div>
        )}
      </div>
    </div>
  );
};
