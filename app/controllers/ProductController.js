import Product from "../models/ProductModels.js";
import { validationResult } from "express-validator";

export const getProducts = async (req, res) => {
  try {
    const response = await Product.findAll();
    res.status(200).json({
      message: "Product List",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (response !== null) {
      res.status(200).json({
        message: "Product Detail",
        data: response,
      });
    } else {
      throw error;
    }
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  const errors = validationResult(req);
  try {
    const response = await Product.create({
      name: name,
      price: price,
      stock: stock,
    });
    res.status(201).json({
      message: "Product created successfully",
      data: { response },
    });
  } catch (error) {
    res
      .status(422)
      .json({ message: "Validation failed", errors: errors.array() });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const response = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (response >= 1) {
      res.status(200).json({
        message: "Product updated successfully",
        data: await Product.findOne({
          where: {
            id: req.params.id,
          },
        }),
      });
    } else {
      throw error;
    }
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const cek = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (cek !== null) {
      const response = await Product.destroy({
        where: {
          id: req.params.id,
        },
      });
      console.log(response);
      if (response !== 0) {
        res.status(200).json({
          message: "Product deleted successfully",
          data: cek,
        });
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};
