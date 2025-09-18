import mongoose from "mongoose";

declare global {
  var mongoose: {
    cnn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}
const MONGOOSE_URI = "mongodb://localhost:27017/TheBeacon";

if (!MONGOOSE_URI) {
  throw new Error("Please define MONGOOSE_URI in env variables");
}

let cached = global.mongoose;

if (!cached) {
  //if no connection then set all the global mongoose variables to null
  cached = global.mongoose = { cnn: null, promise: null };
}
// Add connection event listeners
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

export async function connectDb() {
  if (cached.cnn) {
    // if already have a connection return connection
    return cached.cnn;
  }

  const opts = {
    // use if its on the production
    bufferCommands: true,
    maxPoolSize: 10,
  };

  if (!cached.promise) {
    // if no connection promise then we create a promise
    mongoose.connect(MONGOOSE_URI, opts).then(() => mongoose.connection);
  }
  try {
    // once promise resolved successfully we connect it
    cached.cnn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
  return cached.cnn;
}
