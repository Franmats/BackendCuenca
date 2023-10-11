import { Router } from "express";
import CustonError from "../services/errors/custum.error.js";
import { generateProdErrorInfo } from "../services/errors/info.js";
import EErrors from "../services/errors/enums.js";
import { el } from "@faker-js/faker";

 const products = []

 const router = Router()

 router.get("/", (req,res)=> {
    res.send({status:"success", payload:products})
 })

router.post("/", (req,res)=> {
    const prod = req.body
    console.log(typeof prod.stock =="number");

    if( !typeof prod.stock =="number" || !typeof prod.price =="number"|| !prod.name){

        CustonError.createError({
            name:"Error al crear producto",
            cause:generateProdErrorInfo(prod),
            message:"Error al crear productp",
            code:EErrors.INVALID_TYPER_ERROR
        })



        return res.status(400).send({status:"error",error:"Falta lastname"})
    } 
    products.push(prod)

        res.send({status:"Success",payload:prod})

})

export default router