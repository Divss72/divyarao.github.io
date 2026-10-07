import mongoose from 'mongoose';
import {
  AdminModel,
  ProjectModel,
  SkillModel,
  ExperienceModel,
  ResearchModel,
  BookModel,
  HobbyModel,
  BlogModel,
  CommentModel,
  MediaModel,
  SettingModel,
} from './models/index';
import { DatabaseSchema, db } from './db';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ENV_FILE = path.resolve(__dirname, '..', '.env');

function loadEnvFile() {
  if (fs.existsSync(ENV_FILE)) {
    try {
      const content = fs.readFileSync(ENV_FILE, 'utf8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const idx = trimmed.indexOf('=');
        if (idx !== -1) {
          const key = trimmed.slice(0, idx).trim();
          const val = trimmed.slice(idx + 1).trim();
          if (val) process.env[key] = val;
        }
      }
    } catch {}
  }
}
loadEnvFile();

const getMongoUri = () => {
  loadEnvFile();
  return process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/divyarao_portfolio';
};

class MongoService {
  private isConnected = false;
  private connectionPromise: Promise<boolean> | null = null;

  public async connect(): Promise<boolean> {
    if (this.isConnected) return true;
    if (this.connectionPromise) return this.connectionPromise;

    this.connectionPromise = (async () => {
      const uri = getMongoUri();
      try {
        console.log(`[MongoDB] Connecting to: ${uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')}...`);
        
        await mongoose.connect(uri, {
          serverSelectionTimeoutMS: 10000,
          connectTimeoutMS: 12000,
        });

        this.isConnected = true;
        console.log('✓ [MongoDB] Successfully connected to MongoDB Atlas database.');

        // Initialize / Seed initial database if empty
        await this.autoSeedIfEmpty();

        // Listen for connection drops
        mongoose.connection.on('disconnected', () => {
          this.isConnected = false;
          console.warn('[MongoDB] Disconnected from MongoDB. Operating on local cache fallback.');
        });

        mongoose.connection.on('reconnected', () => {
          this.isConnected = true;
          console.log('[MongoDB] Reconnected to MongoDB.');
        });

        return true;
      } catch (err: any) {
        this.isConnected = false;
        console.warn(`[MongoDB] Could not establish initial connection to MongoDB (${err.message}). Using local database store fallback.`);
        return false;
      }
    })();

    return this.connectionPromise;
  }

  public getConnected(): boolean {
    return this.isConnected;
  }

  /**
   * Seed collections if MongoDB has 0 items
   */
  private async autoSeedIfEmpty() {
    try {
      const projectCount = await ProjectModel.countDocuments();
      if (projectCount === 0) {
        console.log('[MongoDB] Empty database detected. Seeding collections from portfolio archive...');
        const initialData = db.get();

        if (initialData.projects.length > 0) {
          await ProjectModel.insertMany(initialData.projects);
        }
        if (initialData.skills.length > 0) {
          await SkillModel.insertMany(initialData.skills);
        }
        if (initialData.experience.length > 0) {
          await ExperienceModel.insertMany(initialData.experience);
        }
        if (initialData.research.length > 0) {
          await ResearchModel.insertMany(initialData.research);
        }
        if (initialData.books.length > 0) {
          await BookModel.insertMany(initialData.books);
        }
        if (initialData.hobbies.length > 0) {
          await HobbyModel.insertMany(initialData.hobbies);
        }
        if (initialData.blogs.length > 0) {
          await BlogModel.insertMany(initialData.blogs);
        }
        if (initialData.comments.length > 0) {
          await CommentModel.insertMany(initialData.comments);
        }
        if (initialData.media.length > 0) {
          await MediaModel.insertMany(initialData.media);
        }
        if (initialData.settings) {
          await SettingModel.findOneAndUpdate(
            { key: 'global' },
            { key: 'global', ...initialData.settings },
            { upsert: true, new: true }
          );
        }

        console.log('✓ [MongoDB] Collections seeded successfully.');
      } else {
        // Load latest from MongoDB into memory
        await this.syncFromMongoToLocal();
      }
    } catch (e: any) {
      console.warn('[MongoDB] Auto-seeding encounter:', e.message);
    }
  }

  /**
   * Sync collections from MongoDB into memory / file
   */
  public async syncFromMongoToLocal(): Promise<void> {
    if (!this.isConnected) return;
    try {
      const [
        skills,
        projects,
        experience,
        research,
        books,
        hobbies,
        blogs,
        comments,
        media,
        settingDoc,
      ] = await Promise.all([
        SkillModel.find({}).lean(),
        ProjectModel.find({}).lean(),
        ExperienceModel.find({}).lean(),
        ResearchModel.find({}).lean(),
        BookModel.find({}).lean(),
        HobbyModel.find({}).lean(),
        BlogModel.find({}).lean(),
        CommentModel.find({}).lean(),
        MediaModel.find({}).lean(),
        SettingModel.findOne({ key: 'global' }).lean(),
      ]);

      db.update((draft: DatabaseSchema) => {
        if (skills.length) draft.skills = skills as any;
        if (projects.length) draft.projects = projects as any;
        if (experience.length) draft.experience = experience as any;
        if (research.length) draft.research = research as any;
        if (books.length) draft.books = books as any;
        if (hobbies.length) draft.hobbies = hobbies as any;
        if (blogs.length) draft.blogs = blogs as any;
        if (comments.length) draft.comments = comments as any;
        if (media.length) draft.media = media as any;
        if (settingDoc) {
          draft.settings = {
            currently: settingDoc.currently || draft.settings.currently,
            siteMetadata: settingDoc.siteMetadata || draft.settings.siteMetadata,
            socialLinks: settingDoc.socialLinks || draft.settings.socialLinks,
          };
        }
      });
    } catch (err: any) {
      console.warn('[MongoDB] syncFromMongoToLocal failed:', err.message);
    }
  }

  // --- CRUD DISPATCHERS TO MONGO ---

  public async saveProject(project: any) {
    if (!this.isConnected) return;
    try {
      await ProjectModel.findOneAndUpdate({ id: project.id }, project, { upsert: true, new: true });
    } catch (err) {
      console.error('[MongoDB] saveProject error:', err);
    }
  }

  public async deleteProject(id: string) {
    if (!this.isConnected) return;
    try {
      await ProjectModel.deleteOne({ id });
    } catch (err) {
      console.error('[MongoDB] deleteProject error:', err);
    }
  }

  public async saveSkill(skill: any) {
    if (!this.isConnected) return;
    try {
      await SkillModel.findOneAndUpdate({ id: skill.id }, skill, { upsert: true, new: true });
    } catch (err) {
      console.error('[MongoDB] saveSkill error:', err);
    }
  }

  public async deleteSkill(id: string) {
    if (!this.isConnected) return;
    try {
      await SkillModel.deleteOne({ id });
    } catch (err) {
      console.error('[MongoDB] deleteSkill error:', err);
    }
  }

  public async saveExperience(item: any) {
    if (!this.isConnected) return;
    try {
      await ExperienceModel.findOneAndUpdate({ id: item.id }, item, { upsert: true, new: true });
    } catch (err) {
      console.error('[MongoDB] saveExperience error:', err);
    }
  }

  public async deleteExperience(id: string) {
    if (!this.isConnected) return;
    try {
      await ExperienceModel.deleteOne({ id });
    } catch (err) {
      console.error('[MongoDB] deleteExperience error:', err);
    }
  }

  public async saveResearch(item: any) {
    if (!this.isConnected) return;
    try {
      await ResearchModel.findOneAndUpdate({ id: item.id }, item, { upsert: true, new: true });
    } catch (err) {
      console.error('[MongoDB] saveResearch error:', err);
    }
  }

  public async deleteResearch(id: string) {
    if (!this.isConnected) return;
    try {
      await ResearchModel.deleteOne({ id });
    } catch (err) {
      console.error('[MongoDB] deleteResearch error:', err);
    }
  }

  public async saveBook(item: any) {
    if (!this.isConnected) return;
    try {
      await BookModel.findOneAndUpdate({ id: item.id }, item, { upsert: true, new: true });
    } catch (err) {
      console.error('[MongoDB] saveBook error:', err);
    }
  }

  public async deleteBook(id: string) {
    if (!this.isConnected) return;
    try {
      await BookModel.deleteOne({ id });
    } catch (err) {
      console.error('[MongoDB] deleteBook error:', err);
    }
  }

  public async saveHobby(item: any) {
    if (!this.isConnected) return;
    try {
      await HobbyModel.findOneAndUpdate({ id: item.id }, item, { upsert: true, new: true });
    } catch (err) {
      console.error('[MongoDB] saveHobby error:', err);
    }
  }

  public async deleteHobby(id: string) {
    if (!this.isConnected) return;
    try {
      await HobbyModel.deleteOne({ id });
    } catch (err) {
      console.error('[MongoDB] deleteHobby error:', err);
    }
  }

  public async saveBlog(item: any) {
    if (!this.isConnected) return;
    try {
      await BlogModel.findOneAndUpdate({ id: item.id }, item, { upsert: true, new: true });
    } catch (err) {
      console.error('[MongoDB] saveBlog error:', err);
    }
  }

  public async deleteBlog(id: string) {
    if (!this.isConnected) return;
    try {
      await BlogModel.deleteOne({ id });
    } catch (err) {
      console.error('[MongoDB] deleteBlog error:', err);
    }
  }

  public async saveComment(item: any) {
    if (!this.isConnected) return;
    try {
      await CommentModel.findOneAndUpdate({ id: item.id }, item, { upsert: true, new: true });
    } catch (err) {
      console.error('[MongoDB] saveComment error:', err);
    }
  }

  public async updateCommentStatus(id: string, status: string) {
    if (!this.isConnected) return;
    try {
      await CommentModel.updateOne({ id }, { status });
    } catch (err) {
      console.error('[MongoDB] updateCommentStatus error:', err);
    }
  }

  public async deleteComment(id: string) {
    if (!this.isConnected) return;
    try {
      await CommentModel.deleteOne({ id });
    } catch (err) {
      console.error('[MongoDB] deleteComment error:', err);
    }
  }

  public async saveMedia(item: any) {
    if (!this.isConnected) return;
    try {
      await MediaModel.findOneAndUpdate({ id: item.id }, item, { upsert: true, new: true });
    } catch (err) {
      console.error('[MongoDB] saveMedia error:', err);
    }
  }

  public async deleteMedia(id: string) {
    if (!this.isConnected) return;
    try {
      await MediaModel.deleteOne({ id });
    } catch (err) {
      console.error('[MongoDB] deleteMedia error:', err);
    }
  }

  public async saveSettings(settings: any) {
    if (!this.isConnected) return;
    try {
      await SettingModel.findOneAndUpdate(
        { key: 'global' },
        { key: 'global', ...settings },
        { upsert: true, new: true }
      );
    } catch (err) {
      console.error('[MongoDB] saveSettings error:', err);
    }
  }
}

export const mongoService = new MongoService();
