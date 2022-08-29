import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

let mongo: any;
beforeAll(async () => {
  try {
    process.env.JWT_KEY = "asfd";

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri, {});
  } catch (err) {
    console.log("MY ERROR: ", err);
  }
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  if (mongo) {
    await mongo.stop();
  }
});
