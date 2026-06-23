import mongoose from 'mongoose';
import dns from 'dns';

// Fix for Node.js DNS resolution issues on Windows/some networks when resolving MongoDB Atlas SRV/TXT records
if (typeof window === 'undefined' && dns && typeof dns.setServers === 'function') {
  try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
  } catch (err) {
    console.warn('Failed to set custom DNS servers:', err);
  }
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gecouncil';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };
global.mongoose = cached;

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
