import db from "../config/Database.js";
import Order from "../models/OrderModels.js";
import OrderDetail from "../models/OrderDetailModels.js";
import TempOrder from "../models/TempOrdermodels.js";

export const getOrders = async (req, res) => {
  try {
    const response = await Order.findAll();
    res.status(200).json({
      message: "Order List",
      data: response,
    });
  } catch (error) {
    res.status(200).json({
      message: "Order List",
      data: response,
    });
    console.log(error.message);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const response = await Order.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (response !== null) {
      res.status(200).json({
        message: "Order Detail",
        data: response,
      });
    } else {
      throw error;
    }
  } catch (error) {
    res.status(404).json({ message: "Order not found" });
  }
};

export const createOrder = async (req, res) => {
  console.log("DATA ASLI: ", req.body.products);
  const stk = 0;
  try {
    /// ================ Cek Qty ============== ///
    for (let key in req.body.products) {
      const qty = req.body.products[key].quantity;
      const prdID = req.body.products[key].id;

      const query =
        "SELECT EXISTS (SELECT 1 FROM products WHERE stock >= :x and id = :id) AS stock";
      const cekStock = await db.query(query, {
        replacements: { x: qty, id: prdID }, // Use parameterized queries to prevent SQL injection
        type: db.QueryTypes.SELECT, // Specify the type of query (SELECT, INSERT, etc.)
      });
      console.log("HASIL: ", cekStock[0].stock);
      if (cekStock[0].stock < 1) {
        throw error;
      }
      console.log("Pengecekan product id =", prdID);
    }
    ////
    const respOrder = await Order.create();
    //console.log("Result Order: ", respOrder.id);
    ////
    const respOrderDetail = await OrderDetail.bulkCreate(req.body.products);
    //console.log("Result Order Detail: ", respOrderDetail);
    ////
    const response = await OrderDetail.update(
      { orderId: respOrder.id },
      {
        where: {
          orderId: null,
        },
      }
    );
    for (let key in req.body.products) {
      const qty = req.body.products[key].quantity;
      const prdID = req.body.products[key].id;
      const query = "UPDATE products SET stock = stock - :x  WHERE id = :id;";
      const cekStock = await db.query(query, {
        replacements: { x: qty, id: prdID }, // Use parameterized queries to prevent SQL injection
        type: db.QueryTypes.UPDATE, // Specify the type of query (SELECT, INSERT, etc.)
      });
    }
    res.status(200).json({
      message: "Order created",
      data: { id: respOrder.id, products: respOrderDetail },
    });
  } catch (error) {
    if (stk < 1) {
      res.status(404).json({ message: "Product out of stock" });
    } else {
      res.status(400).json({ message: "Product not found" });
    }
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const cek = await Order.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (cek !== null) {
      const response = await Order.destroy({
        where: {
          id: req.params.id,
        },
      });
      console.log(response);
      if (response !== 0) {
        res.status(200).json({
          message: "Order deleted successfully",
          data: cek,
        });
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  } catch (error) {
    res.status(404).json({ message: "Order not found" });
  }
};
