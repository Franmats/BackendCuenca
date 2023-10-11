import { Router } from "express";
import { generateP} from "../utils.js";

const router = Router()

router.get("/",async(req,res)=> {
    const productos = []
    

    for (let i = 0; i < 100; i++) {
        productos.push(generateP())
        
    }

    res.send({status:"succes",productos})
})

export default router