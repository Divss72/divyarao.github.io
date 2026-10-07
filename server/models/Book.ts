import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  id: string;
  title: string;
  author: string;
  cover?: string;
  category: string;
  status: 'Reading' | 'Completed' | 'Want to Read' | 'Revisiting';
  rating?: number;
  note: string;
  takeaway?: string;
  favoriteQuote?: string;
  published: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    cover: { type: String, default: '' },
    category: { type: String, default: 'Engineering' },
    status: {
      type: String,
      enum: ['Reading', 'Completed', 'Want to Read', 'Revisiting'],
      default: 'Reading',
    },
    rating: { type: Number, default: 5 },
    note: { type: String, default: '' },
    takeaway: { type: String, default: '' },
    favoriteQuote: { type: String, default: '' },
    published: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const BookModel = mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);
