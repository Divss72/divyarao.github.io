import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const ENV_FILE = path.join(ROOT_DIR, '.env');
const DB_FILE = path.join(ROOT_DIR, 'server', 'data', 'db.json');

// Read environment variables from .env
function loadEnv() {
  if (fs.existsSync(ENV_FILE)) {
    const content = fs.readFileSync(ENV_FILE, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        process.env[key] = val;
      }
    }
  }
}

loadEnv();

const uri = process.env.MONGODB_URI;

if (!uri || uri.includes('127.0.0.1')) {
  console.log('\n=========================================');
  console.log('MongoDB Atlas Connection Setup');
  console.log('=========================================');
  console.log('Your current MONGODB_URI is pointing to local fallback.');
  console.log('\nTo connect to MongoDB Atlas:');
  console.log('1. Go to your MongoDB Atlas dashboard (cloud.mongodb.com)');
  console.log('2. Click "Connect" -> "Drivers" -> Node.js');
  console.log('3. Copy your connection string:');
  console.log('   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/divyarao_portfolio?retryWrites=true&w=majority');
  console.log('4. Ensure your Network Access includes your current IP address (or 0.0.0.0/0 for testing).');
  console.log('5. Put this URI in your .env file as:');
  console.log('   MONGODB_URI=your_atlas_connection_string');
  console.log('=========================================\n');
  process.exit(0);
}

console.log(`Connecting to MongoDB Atlas...`);
console.log(`URI: ${uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')}`);

try {
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log('✓ Successfully connected to MongoDB Atlas!');

  // Check collections and seed if needed
  if (fs.existsSync(DB_FILE)) {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const localData = JSON.parse(raw);
    const db = mongoose.connection.db;

    console.log('\nSynchronizing collections with Atlas:');
    
    const collectionsToSync = [
      { name: 'projects', data: localData.projects },
      { name: 'skills', data: localData.skills },
      { name: 'experience', data: localData.experience },
      { name: 'research', data: localData.research },
      { name: 'books', data: localData.books },
      { name: 'hobbies', data: localData.hobbies },
      { name: 'blogs', data: localData.blogs },
      { name: 'comments', data: localData.comments },
      { name: 'media', data: localData.media },
    ];

    for (const col of collectionsToSync) {
      const collection = db.collection(col.name);
      const count = await collection.countDocuments();
      if (count === 0 && col.data && col.data.length > 0) {
        await collection.insertMany(col.data);
        console.log(`  ✓ Seeded ${col.data.length} records into "${col.name}"`);
      } else {
        console.log(`  ● Collection "${col.name}": ${count} records active`);
      }
    }

    if (localData.settings) {
      const settingsCol = db.collection('settings');
      await settingsCol.updateOne(
        { key: 'global' },
        { $set: { key: 'global', ...localData.settings } },
        { upsert: true }
      );
      console.log('  ✓ Synchronized site settings document');
    }
  }

  console.log('\n✓ MongoDB Atlas real-time synchronization is fully active!\n');
  await mongoose.disconnect();
} catch (err) {
  console.error('\n✗ Failed to connect to MongoDB Atlas:', err.message);
  console.error('Check:');
  console.error('1. Did you replace <password> with your actual database user password?');
  console.error('2. Is your IP address allowed in MongoDB Atlas -> Network Access -> IP Access List?');
  process.exit(1);
}
