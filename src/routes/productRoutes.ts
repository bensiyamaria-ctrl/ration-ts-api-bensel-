
import { Router } from "express";
import { getProducts,createProductController } from "../controllers/productController.js";

const router = Router();

router.get("/", getProducts);
router.post("/", createProductController);

export default router;
