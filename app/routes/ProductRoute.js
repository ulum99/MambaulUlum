import express, { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController.js";
import { body, validationResult } from "express-validator";

const validateProduct = [
  body("name").isString().withMessage("The name field is required."),
  body("price")
    .isInt({ min: 1 })
    .withMessage("The price field must be a number."),
  body("stock")
    .isInt({ min: 0 })
    .withMessage("The price field must be a number."),
];

const router = express.Router();

router.get("/api/products", getProducts);

router.post("/api/products", validateProduct, createProduct);

router.get("/api/products/:id", getProductById);
router.put("/api/products/:id", updateProduct);
router.delete("/api/products/:id", deleteProduct);

export default router;
