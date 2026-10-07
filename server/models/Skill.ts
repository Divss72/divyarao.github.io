import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  id: string;
  name: string;
  category: string;
  familiarity: string;
  technologies: string[];
  description: string;
  displayOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    category: { type: String, required: true, index: true },
    familiarity: { type: String, default: 'Proficient' },
    technologies: [{ type: String }],
    description: { type: String, default: '' },
    displayOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const SkillModel = mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
