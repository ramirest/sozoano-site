import mongoose from "mongoose";

declare global {
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

// Cache global para evitar múltiplas conexões em hot-reload (dev).
const cached = global.mongooseCache ?? { conn: null, promise: null };

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error("Defina MONGODB_URI no ambiente para usar o banco de dados.");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    // Abre a conexão uma única vez e reaproveita nas próximas chamadas.
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB || "sozoano",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  global.mongooseCache = cached;

  return cached.conn;
}
