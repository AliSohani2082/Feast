import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
  url: process.env.URL || '',
  projectId: process.env.PROJECT_ID || '',
  databaseId: process.env.DATABASE_ID || '',
  storageId: process.env.STORAGE_ID || '',
  userCollectionId: process.env.USER_COLLECTION_ID || '',
  postCollectionId: process.env.POST_COLLECTION_ID || '',
  savesCollectionId: process.env.SAVE_COLLECTION_ID || '',
} as const;

console.log(appwriteConfig);

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
