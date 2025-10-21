import dotenv from "dotenv";
dotenv.config();

const env = process.env.NODE_ENV || "development";

export const dbConfig = {
  url: process.env.DATABASE_URL,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  timezone: process.env.TZ || "+07:00", // default Waktu Indonesia Barat
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  },
  logging: false,
};

export default dbConfig;
