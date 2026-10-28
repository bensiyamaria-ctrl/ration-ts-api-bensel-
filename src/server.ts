
import "dotenv/config";
import express from "express";
import productRoutes from "./routes/productRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Parse incoming JSON request bodies
app.use(express.json());

// Register product routes
app.use("/api/products", productRoutes);
app.use("/api/stock", stockRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`); 
});
