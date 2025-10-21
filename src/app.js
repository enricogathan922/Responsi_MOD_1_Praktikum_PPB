import express from "express";
import shoeRoutes from "./routes/shoe.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, Express + Supabase + Sequelize!");
});

app.use("/api/shoes", shoeRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    data: null,
    message: "Route not found",
  });
});

app.use(errorHandler);

export default app;
