import dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';
import mongoose from 'mongoose';

const envCandidates = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '../.env'),
];
for (const envPath of envCandidates) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
}

import User from './models/User.js';
import Internship from './models/Internship.js';
import Application from './models/Application.js';
import LaunchpadItem from './models/LaunchpadItem.js';
import Conversation from './models/Conversation.js';
import Message from './models/Message.js';
import VerificationRequest from './models/VerificationRequest.js';
import Notification from './models/Notification.js';
import SkillAssessment from './models/SkillAssessment.js';
import SkillSubmission from './models/SkillSubmission.js';
import Bookmark from './models/Bookmark.js';

const DEFAULT_MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/showmyskills';

export const clearDatabase = async (targetUri) => {
  try {
    console.log(`\nConnecting to: ${targetUri}`);
    await mongoose.connect(targetUri);
    const dbName = mongoose.connection.name;
    console.log(`🧹 Clearing all collections in database: "${dbName}"...`);

    await Promise.all([
      User.deleteMany({}),
      Internship.deleteMany({}),
      Application.deleteMany({}),
      LaunchpadItem.deleteMany({}),
      Conversation.deleteMany({}),
      Message.deleteMany({}),
      VerificationRequest.deleteMany({}),
      Notification.deleteMany({}),
      SkillAssessment.deleteMany({}),
      SkillSubmission.deleteMany({}),
      Bookmark.deleteMany({}),
    ]);

    console.log(`✅ All collections successfully cleared in "${dbName}".`);
    await mongoose.disconnect();
  } catch (error) {
    console.error(`❌ Error clearing database in ${targetUri}:`, error);
    try {
      await mongoose.disconnect();
    } catch {}
    throw error;
  }
};

export const seedDatabase = async () => {
  const baseUri = DEFAULT_MONGODB_URI.trim();
  let targetUris = [baseUri];

  if (baseUri.includes('mongodb.net')) {
    const match = baseUri.match(/^(mongodb\+srv:\/\/[^/]+)(\/[^?]*)?(\?.*)?$/);
    if (match) {
      const root = match[1];
      const query = match[3] || '?retryWrites=true&w=majority';
      targetUris = [
        `${root}/test${query}`,
        `${root}/showmyskills${query}`,
      ];
    }
  }

  for (const uri of targetUris) {
    await clearDatabase(uri);
  }

  console.log('\n🧹 Database is completely clean (0 dummy data). Ready for production dataset.');
  process.exit(0);
};

if (process.argv[1]?.endsWith('seed.js')) {
  seedDatabase().catch((err) => {
    console.error('Fatal clear/seed failure:', err);
    process.exit(1);
  });
}
