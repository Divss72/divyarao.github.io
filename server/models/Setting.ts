import mongoose, { Schema, Document } from 'mongoose';

export interface ISetting extends Document {
  key: string;
  currently: {
    reading: string;
    readingAuthor: string;
    exploring: string;
    building: string;
    obsessedWith?: string;
    debuggingNote?: string;
    coffeeStatus?: string;
  };
  siteMetadata: {
    title: string;
    description: string;
    author: string;
    location: string;
    statusBadge: string;
    activePhoto: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    instagram?: string;
  };
  updatedAt: Date;
}

const SettingSchema: Schema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: 'global' },
    currently: {
      reading: { type: String, default: '' },
      readingAuthor: { type: String, default: '' },
      exploring: { type: String, default: '' },
      building: { type: String, default: '' },
      obsessedWith: { type: String, default: '' },
      debuggingNote: { type: String, default: '' },
      coffeeStatus: { type: String, default: '' },
    },
    siteMetadata: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      author: { type: String, default: 'Divya Rao' },
      location: { type: String, default: 'Chandigarh, India' },
      statusBadge: { type: String, default: 'Available for SWE Roles' },
      activePhoto: { type: String, default: 'me1.jpeg' },
    },
    socialLinks: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      email: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

export const SettingModel = mongoose.models.Setting || mongoose.model<ISetting>('Setting', SettingSchema);
