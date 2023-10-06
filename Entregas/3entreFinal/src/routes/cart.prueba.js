import { Router } from "express";
import { getCarts,getCartByID,createCart,deleteProductCartByID,deleteProductsInCart, putProductInCart, updateQuantityOfProductInCart, getCartDetailsForView } from "../controllers/carts.controller.js";
import { authUser } from "../controllers/users.controller.js";
const router = Router()

router.get("/", getCarts)

router.get("/:cid",getCartByID)

router.post("/",createCart)

router.post("/:cid/product/:pid/cant/:qua",authUser,putProductInCart)

router.delete("/:cid/product/:pid",deleteProductCartByID)

router.put("/:cid/product/:pid",updateQuantityOfProductInCart)

router.delete("/:cid",deleteProductsInCart)

router.get("/checkout/:cid",getCartDetailsForView)

export default router