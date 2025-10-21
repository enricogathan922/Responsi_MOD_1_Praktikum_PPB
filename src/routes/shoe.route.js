import express from "express";
import {
  createShoe,
  getAllShoes,
  getShoeById,
  updateShoe,
  deleteShoe,
} from "../controller/shoe.controller.js";

const router = express.Router();

router.post("/", createShoe);
router.get("/", getAllShoes);
router.get("/:id", getShoeById);
router.put("/:id", updateShoe);
router.delete("/:id", deleteShoe);

export default router;
