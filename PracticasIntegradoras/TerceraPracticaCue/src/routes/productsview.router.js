import { Router } from "express";
import { getProductById, getProductsViews } from "../controllers/productsview.controller.js";

const router = Router()

router.get("/",getProductsViews)
router.get("/:id",getProductById)

export default router