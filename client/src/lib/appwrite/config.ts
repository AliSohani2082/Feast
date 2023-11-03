import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
  url: process.env.APPWRITE_URL || '',
  projectId: process.env.APPWRITE_PROJECT_ID || '',
  databaseId: process.env.APPWRITE_DATABASE_ID || '',
  storageId: process.env.APPWRITE_STORAGE_ID || '',
  userCollectionId: process.env.APPWRITE_USER_COLLECTION_ID || '',
  postCollectionId: process.env.APPWRITE_POST_COLLECTION_ID || '',
  savesCollectionId: process.env.APPWRITE_SAVES_COLLECTION_ID || '',
} as const;

export const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1');
client.setProject('653b95d241aea5b0243a');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
