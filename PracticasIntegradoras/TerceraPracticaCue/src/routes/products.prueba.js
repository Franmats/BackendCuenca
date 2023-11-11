import { Router } from "express";
import { getProducts , createProduct, updateStockProduct,deleteProduct } from "../controllers/products.controller.js";
import { authUser } from "../controllers/users.controller.js";
const router = Router()

router.get("/",getProducts)

router.post("/",createProduct)

router.put("/:pid/stock/:num",authUser,updateStockProduct)

router.delete("/:id",authUser, deleteProduct)

export default router