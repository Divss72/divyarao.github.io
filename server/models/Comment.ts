import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  id: string;
  blogSlug: string;
  authorName: string;
  authorEmail?: string;
  content: string;
  timestamp: string;
  status: 'approved' | 'pending' | 'rejected' | 'spam';
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    blogSlug: { type: String, required: true, index: true },
    authorName: { type: String, required: true },
    authorEmail: { type: String, default: '' },
    content: { type: String, required: true },
    timestamp: { type: String, default: '' },
    status: {
      type: String,
      enum: ['approved', 'pending', 'rejected', 'spam'],
      default: 'pending',
      index: true,
    },
  },
  { timestamps: true }
);

export const CommentModel = mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);
