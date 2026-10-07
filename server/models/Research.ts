import mongoose, { Schema, Document } from 'mongoose';

export interface IResearch extends Document {
  id: string;
  slug: string;
  title: string;
  type: string;
  topic: string;
  question: string;
  whyInterested: string;
  whatReading: string;
  whatTesting: string;
  whatFound: string;
  whatStillDontKnow: string;
  status: string;
  tags: string[];
  references?: string;
  githubUrl?: string;
  published: boolean;
  displayOrder: number;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

const ResearchSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    type: {
      type: String,
      default: 'Research Interest',
    },
    topic: { type: String, required: true },
    question: { type: String, required: true },
    whyInterested: { type: String, default: '' },
    whatReading: { type: String, default: '' },
    whatTesting: { type: String, default: '' },
    whatFound: { type: String, default: '' },
    whatStillDontKnow: { type: String, default: '' },
    status: { type: String, default: 'Exploring' },
    tags: [{ type: String }],
    references: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    published: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
    date: { type: String, default: '' },
  },
  { timestamps: true }
);

export const ResearchModel =
  mongoose.models.Research || mongoose.model<IResearch>('Research', ResearchSchema);
