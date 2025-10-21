import db from "../models/index.js";
import Joi from "joi";
import { ValidationError, NotFoundError } from "../middlewares/errorHandler.js";

const Shoe = db.Shoe;

// === Schema Validasi ===
const shoeSchema = Joi.object({
  nama: Joi.string().min(2).max(255).trim().required().messages({
    "string.base": `"nama" harus berupa teks`,
    "string.empty": `"nama" tidak boleh kosong`,
    "string.min": `"nama" minimal 2 karakter`,
    "string.max": `"nama" maksimal 255 karakter`,
    "any.required": `"nama" wajib diisi`,
  }),
  status: Joi.string().trim().required().messages({
    "string.base": `"status" harus berupa teks`,
    "string.empty": `"status" tidak boleh kosong`,
    "any.required": `"status" wajib diisi`,
  }),
  tanggalMasuk: Joi.date().iso().required().messages({
    "date.base": `"tanggalMasuk" harus berupa tanggal valid (YYYY-MM-DD)`,
    "date.format": `"tanggalMasuk" harus dalam format ISO (YYYY-MM-DD)`,
    "any.required": `"tanggalMasuk" wajib diisi`,
  }),
  tanggalSelesai: Joi.alternatives()
    .try(Joi.date().iso(), Joi.string().valid("-", "").allow(null))
    .optional()
    .messages({
      "date.format": `"tanggalSelesai" harus dalam format ISO (YYYY-MM-DD) atau "-"`,
      "any.only": `"tanggalSelesai" harus berupa tanggal valid atau "-"`,
    }),
});

// Schema untuk update
const updateShoeSchema = Joi.object({
  nama: Joi.string().min(2).max(255).trim().optional().messages({
    "string.base": `"nama" harus berupa teks`,
    "string.empty": `"nama" tidak boleh kosong`,
    "string.min": `"nama" minimal 2 karakter`,
    "string.max": `"nama" maksimal 255 karakter`,
  }),
  status: Joi.string().trim().optional().messages({
    "string.base": `"status" harus berupa teks`,
    "string.empty": `"status" tidak boleh kosong`,
  }),
  tanggalMasuk: Joi.date().iso().optional().messages({
    "date.base": `"tanggalMasuk" harus berupa tanggal valid (YYYY-MM-DD)`,
    "date.format": `"tanggalMasuk" harus dalam format ISO (YYYY-MM-DD)`,
  }),
  tanggalSelesai: Joi.alternatives()
    .try(Joi.date().iso(), Joi.string().valid("-", "").allow(null))
    .optional()
    .messages({
      "date.format": `"tanggalSelesai" harus dalam format ISO (YYYY-MM-DD) atau "-"`,
      "any.only": `"tanggalSelesai" harus berupa tanggal valid atau "-"`,
    }),
})
  .min(1)
  .messages({
    "object.min": "Minimal satu field harus diisi untuk update",
  });

export const createShoe = async (req, res, next) => {
  try {
    const { error, value } = shoeSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new ValidationError(
        "Validation failed",
        error.details.map((d) => d.message)
      );
    }

    const newShoe = await Shoe.create(value);

    return res.status(201).json({
      status: "success",
      data: newShoe,
      message: "Shoe created successfully",
    });
  } catch (err) {
    next(err); 
  }
};

export const getAllShoes = async (req, res, next) => {
  try {
    const shoes = await Shoe.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      status: "success",
      data: shoes,
      message: "Fetched all shoes successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getShoeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      throw new ValidationError("Invalid ID format", [
        "ID harus berupa angka yang valid",
      ]);
    }

    const shoe = await Shoe.findByPk(id);

    if (!shoe) {
      throw new NotFoundError("Shoe not found");
    }

    return res.status(200).json({
      status: "success",
      data: shoe,
      message: "Shoe fetched successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const updateShoe = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      throw new ValidationError("Invalid ID format", [
        "ID harus berupa angka yang valid",
      ]);
    }

    const shoe = await Shoe.findByPk(id);
    if (!shoe) {
      throw new NotFoundError("Shoe not found");
    }

    const { error, value } = updateShoeSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new ValidationError(
        "Validation failed",
        error.details.map((d) => d.message)
      );
    }

    await shoe.update(value);

    return res.status(200).json({
      status: "success",
      data: shoe,
      message: "Shoe updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteShoe = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      throw new ValidationError("Invalid ID format", [
        "ID harus berupa angka yang valid",
      ]);
    }

    const shoe = await Shoe.findByPk(id);
    if (!shoe) {
      throw new NotFoundError("Shoe not found");
    }

    await shoe.destroy();

    return res.status(200).json({
      status: "success",
      data: null,
      message: "Shoe deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
