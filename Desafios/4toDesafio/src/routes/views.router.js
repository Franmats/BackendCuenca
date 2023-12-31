import {ProductManager} from "../managers/ProductManager.js"
import { Router } from "express";

const router = Router()

const manager = new ProductManager("BD.json");


router.get("/", (req,res) =>{
    res.render("index",{})
})

router.get("/realtimeproducts",async (req,res)=> {
    const productos = await manager.getProducts()
    res.render("realtimeProducts", {productos})
})




export default router
