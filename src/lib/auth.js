import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const uri = process.env.MONGODB_URI;
const baseURL = process.env.BETTER_AUTH_URL || "http://localhost:3000";

const client = new MongoClient(uri);

const db = client.db(process.env.MONGODB_DB || "Studio-space");

export const auth = betterAuth({
  baseURL,

  emailAndPassword: {
    enabled: true,
  },

  database: mongodbAdapter(db, {
    client,
  }),

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  plugins: [
    jwt({
      jwt: {
        issuer: baseURL,
        audience: baseURL,
        definePayload: ({ user }) => ({
          id: user.id,
          email: user.email,
          name: user.name,
        }),
      },
    }),
  ],

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    cookieCache: {
      enabled: false,
    },
  },
});
