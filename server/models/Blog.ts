import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  readTime: string;
  publishDate: string;
  draft: boolean;
  seoTitle?: string;
  seoDescription?: string;
  author: string;
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    excerpt: { type: String, default: '' },
    content: { type: String, required: true },
    category: { type: String, default: 'Software Engineering' },
    tags: [{ type: String }],
    readTime: { type: String, default: '5 min read' },
    publishDate: { type: String, default: '' },
    draft: { type: Boolean, default: false },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    author: { type: String, default: 'Divya Rao' },
    coverImage: { type: String, default: '' },
  },
  { timestamps: true }
);

export const BlogModel = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
