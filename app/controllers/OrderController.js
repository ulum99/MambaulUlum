import Order from "../models/OrderModels.js";

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
  const { products } = req.body;
  console.log(products);
  try {
    //const response = await Order.bulkCreate([req.body]);
    const response = await Order.bulkCreate({
      productsId: products.id,
      quatity: products.quatity,
    });
    console.log(response);
    res.status(200).json({
      message: "Order created",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
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
