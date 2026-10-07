import mongoose, { Schema, Document } from 'mongoose';

export interface IHobby extends Document {
  id: string;
  title: string;
  category: string;
  description: string;
  personalStory: string;
  interactiveType: string;
  toolsUsed: string[];
  status: string;
  published: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const HobbySchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, default: '' },
    personalStory: { type: String, default: '' },
    interactiveType: { type: String, default: 'card' },
    toolsUsed: [{ type: String }],
    status: { type: String, default: 'Active' },
    published: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const HobbyModel = mongoose.models.Hobby || mongoose.model<IHobby>('Hobby', HobbySchema);
