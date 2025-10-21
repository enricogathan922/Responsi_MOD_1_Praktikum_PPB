import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { Sequelize, DataTypes } from "sequelize";
import config from "../config/config.js";
import pg from "pg"; // ⬅️ penting agar pg dimuat manual (fix error di Vercel)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inisialisasi Sequelize
const sequelize = new Sequelize(config.url, {
  dialect: config.dialect,
  dialectModule: pg, // ⬅️ ini wajib agar Sequelize tahu driver-nya
  dialectOptions: config.dialectOptions,
  logging: false, // biar console nggak ramai di Vercel
});

const db = {};

// Baca semua file model
const files = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== path.basename(__filename) &&
      file.endsWith(".js")
  );

// Load semua model (pakai dynamic import agar kompatibel ESM)
for (const file of files) {
  const modelPath = path.join(__dirname, file);
  const modelModule = await import(pathToFileURL(modelPath));
  const model = modelModule.default(sequelize, DataTypes);
  db[model.name] = model;
}

// Hubungkan relasi antar model (jika ada)
for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

// Export instance Sequelize dan semua model
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
export { sequelize };
