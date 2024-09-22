import express from "express";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";
import OrderRoute from "./routes/OrderRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(ProductRoute);
app.use(OrderRoute);

app.listen(5000, () => console.log("SERVER UP & RUNNING"));
