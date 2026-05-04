import { MongoClient } from "mongodb";

let clientPromise;

export function getMongoClient() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI in environment variables");
  }

  if (!clientPromise) {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    clientPromise = client.connect();
  }

  return clientPromise;
}