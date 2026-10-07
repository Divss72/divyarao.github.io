import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="paper-card p-6 sm:p-8 flex flex-col justify-between group">
      <div className="space-y-3">
        {/* Category & Read Time */}
        <div className="flex items-center justify-between text-xs font-mono text-coffee-muted">
          <span className="paper-tag font-bold">
            {post.category}
          </span>
          <span>{post.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="font-editorial text-xl sm:text-2xl font-bold text-coffee-espresso group-hover:text-accent-terracotta transition-colors leading-snug">
          <Link to={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm font-sans text-coffee-dark/90 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      {/* Footer Meta */}
      <div className="pt-6 mt-4 border-t border-beige/60 flex items-center justify-between text-xs font-mono text-coffee-muted">
        <span>{post.publishDate}</span>

        <Link
          to={`/blog/${post.slug}`}
          className="text-accent-terracotta font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1"
        >
          <span>Read Essay</span>
          <span>→</span>
        </Link>
      </div>
    </article>
  );
};
