
export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      status: "error",
      data: null,
      message: "Validation failed",
      errors: err.errors.map((e) => e.message),
    });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({
      status: "error",
      data: null,
      message: "Data sudah ada",
      errors: err.errors.map((e) => `${e.path} sudah digunakan`),
    });
  }

  if (err.name === "SequelizeDatabaseError") {
    return res.status(400).json({
      status: "error",
      data: null,
      message: "Invalid data format",
      errors: [err.message],
    });
  }

  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      status: "error",
      data: null,
      message: "Foreign key constraint failed",
      errors: ["Referenced data does not exist"],
    });
  }

  if (err.isValidation) {
    return res.status(400).json({
      status: "error",
      data: null,
      message: err.message || "Validation failed",
      errors: err.errors || [],
    });
  }

  if (err.isNotFound) {
    return res.status(404).json({
      status: "error",
      data: null,
      message: err.message || "Resource not found",
    });
  }

  return res.status(err.statusCode || 500).json({
    status: "error",
    data: null,
    message: err.message || "Internal server error",
    errors: err.errors || [],
  });
};

export class ValidationError extends Error {
  constructor(message, errors = []) {
    super(message);
    this.name = "ValidationError";
    this.isValidation = true;
    this.errors = errors;
  }
}

export class NotFoundError extends Error {
  constructor(message = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
    this.isNotFound = true;
  }
}
