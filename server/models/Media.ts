import mongoose, { Schema, Document } from 'mongoose';

export interface IMedia extends Document {
  id: string;
  title: string;
  category: string;
  url: string;
  altText?: string;
  uploadedAt: string;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    category: { type: String, default: 'Asset', index: true },
    url: { type: String, required: true },
    altText: { type: String, default: '' },
    uploadedAt: { type: String, default: '' },
  },
  { timestamps: true }
);

export const MediaModel = mongoose.models.Media || mongoose.model<IMedia>('Media', MediaSchema);
