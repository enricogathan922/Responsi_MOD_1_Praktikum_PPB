import app from "./src/app.js";
import db from "./src/models/index.js";

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  // Jalankan server lokal
  const start = async () => {
    try {
      await db.sequelize.authenticate();
      console.log("✅ DB connection OK");
      await db.sequelize.sync({ alter: true });
      console.log("✅ Models synced");

      app.listen(PORT, () =>
        console.log(`🚀 Server running on http://localhost:${PORT}`)
      );
    } catch (err) {
      console.error("❌ Unable to connect to DB:", err);
    }
  };

  start();
}

// Export app untuk vercel
export default app;
