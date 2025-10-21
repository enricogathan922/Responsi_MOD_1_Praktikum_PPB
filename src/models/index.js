import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { Sequelize, DataTypes } from "sequelize";
import config from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inisialisasi Sequelize
const sequelize = new Sequelize(config.url, {
  dialect: config.dialect,
  dialectOptions: config.dialectOptions,
});

const db = {};

// Baca semua file model
const files = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === ".js"
  );

// Pakai loop for..of agar async/await bisa jalan dengan benar
for (const file of files) {
  const modelPath = path.join(__dirname, file);
  const modelModule = await import(pathToFileURL(modelPath)); // ✅ ini penting!
  const model = modelModule.default(sequelize, DataTypes);
  db[model.name] = model;
}

// Hubungkan relasi antar model (kalau ada)
for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

// Export instance Sequelize dan objeks db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
export { sequelize };
