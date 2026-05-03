import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable.");
}

if (uri.includes("YOUR_NEW_PASSWORD") || uri.includes("<db_password>")) {
  throw new Error(
    "Please replace the placeholder password in MONGODB_URI with your actual Atlas password. Example: mongodb+srv://user:password@cluster0.example.mongodb.net/..."
  );
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  clientPromise = client.connect();
}

const clientPromiseExport = await clientPromise;

export default clientPromiseExport;