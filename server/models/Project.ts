import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  type: string;
  description: string;
  problem: string;
  solution: string;
  myRole: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  galleryImages: { url: string; caption: string }[];
  featured: boolean;
  status: 'PRODUCTION' | 'ONLINE' | 'ACTIVE' | 'ARCHIVED';
  published: boolean;
  displayOrder: number;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    category: { type: String, default: 'Full-Stack Development' },
    type: { type: String, default: 'Web Application' },
    description: { type: String, required: true },
    problem: { type: String, default: '' },
    solution: { type: String, default: '' },
    myRole: { type: String, default: 'Full-Stack Developer' },
    techStack: [{ type: String }],
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    image: { type: String, default: '' },
    galleryImages: [
      {
        url: { type: String },
        caption: { type: String },
      },
    ],
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['PRODUCTION', 'ONLINE', 'ACTIVE', 'ARCHIVED'],
      default: 'ONLINE',
    },
    published: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
    date: { type: String, default: '' },
  },
  { timestamps: true }
);

export const ProjectModel = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
