import serverless from "serverless-http";
import app from "../src/app.js";
import db from "../src/models/index.js";

// Inisialisasi koneksi database sekali saja
let isConnected = false;
async function ensureDBConnection() {
  if (!isConnected) {
    try {
      await db.sequelize.authenticate();
      console.log("✅ Database connected (Vercel).");
      isConnected = true;
    } catch (err) {
      console.error("❌ Database connection failed:", err.message);
    }
  }
}

export const handler = serverless(async (req, res) => {
  await ensureDBConnection();
  return app(req, res);
});

export default handler;
