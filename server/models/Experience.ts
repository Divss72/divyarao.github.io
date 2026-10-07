import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: string;
  badge: string;
  highlights: string[];
  current: boolean;
  displayOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    role: { type: String, required: true },
    organization: { type: String, required: true },
    period: { type: String, required: true },
    location: { type: String, default: '' },
    type: { type: String, default: 'Engineering' },
    badge: { type: String, default: '' },
    highlights: [{ type: String }],
    current: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const ExperienceModel =
  mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);
