import { Router } from "express";
import {CartManager} from "../DAO/fileManager/CartManager.js"
import CartModel from "../DAO/mongoManager/models/cart.model.js";

const router = Router()

// MOSTRAR LOS CARRITOS GUARDADOS
router.get("/", async (req, res)=> {
  const result = await CartModel.find().populate("products.product")
  console.log(JSON.stringify(result,null,"\t"));
  res.send(result)
})

// CREAR UN CARRITO 
router.post("/", async (req, res)=> {
  const result = await CartModel.create({products:[]})
  res.send(result)
})


//BUSCAR POR CARRITO 
router.get("/:cid", async (req, res)=> {
    const cid = req.params.cid
    const prod = await CartModel.findOne({ _id: cid }).populate("products.product")
    if (!prod) res.send({error:"Carrito no existente"})
    else res.render("carts",{prod})
})



// INTRODUCIR UN PRODUCTO EN UN DETERMINADO CARRITO 
router.post("/:cid/product/:pid", async (req,res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const carrito =  await CartModel.findById(cid)
    carrito.products.push({id:pid,quantity:2})
    const result = carrito.save()
    res.send(result)
})

//ELIMINAR UN PRODUCTO DE UN DETERMINADO CARRTIO 
router.delete("/:cid/product/:pid", async (req,res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const carrito =  await CartModel.findById(cid)
    try{

      const modificacion = carrito.products.filter(e => e.id != pid)

      let resultado = await CartModel.updateOne({_id : cid},{$set:{products : modificacion}})
      res.send(resultado)

    }catch {
      console.log("Error ")
    }
    
    
})

// ACTUALIZAR SOLO CANTIDAD DE PRODUCTOS DEL CARRTIO
router.put("/:cid/product/:pid",async (req,res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const nuevaCant =  req.body
    try{

      let resultado = await CartModel.updateOne({_id : cid ,"products.id": pid},{ $set: { "products.$.quantity": nuevaCant.quantity}} )
      res.send({success:"sucess"})
      
    }catch{
      console.log("Error")
    }
})


//ELIMINAR PRODUCTOS DE UN CARRITO DETERMINADO

router.delete("/:cid", async (req,res) => {
  const cid = req.params.cid
  try{

    let resultado = await CartModel.updateOne({_id : cid},{products : []})
    res.send(resultado)

  }catch {
    console.log("Error ")
  }
})

export default router

