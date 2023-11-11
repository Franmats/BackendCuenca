import { Router } from "express";
import { getCarts,getCartByID,createCart,deleteProductCartByID,deleteProductsInCart, putProductInCart, updateQuantityOfProductInCart, getCartDetailsForView } from "../controllers/carts.controller.js";
import { authUser } from "../controllers/users.controller.js";
const router = Router()

router.get("/", getCarts)

router.get("/s",getCartByID)

router.post("/",createCart)

router.get("/:cid/product/:pid/cant/:qua",putProductInCart)

router.delete("/:cid/product/:pid",deleteProductCartByID)

router.put("/:cid/product/:pid",updateQuantityOfProductInCart)

router.delete("/:cid",deleteProductsInCart)

router.get("/checkout",getCartDetailsForView)

export default router