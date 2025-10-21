import app from "./src/app.js";
import db from "./src/models/index.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Database connection established.");

    await db.sequelize.sync({ alter: true });
    console.log("✅ All models synced successfully.");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
