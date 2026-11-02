import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/database";
const client = new MongoClient(uri);
// The Atlas URI has no database in its path, so client.db() would fall back to "test".
const db = client.db(process.env.MONGODB_DB || "Studio-space");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
