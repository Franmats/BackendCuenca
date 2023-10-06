import {productsService} from "../DAO/repository/index.js"

export const getProducts = async(req,res) => {
    let result  = await productsService.getProducts()
    res.send({status:"success", payload:result})
}

export const getProductByID = async (req,res) => {
    const id = req.params.id
    const result = await productsService.getProductByID(id)
    res.send({status:"success", payload:result})
}

export const createProduct = async (req,res) => {
    const product = req.body
    const result = await productsService.createProduct(product)
    res.send({status:"success", payload:result})
}

export const updateStockProduct = async (req,res)=> {
    const id = req.params.pid
    const number = req.params.num

    const result = await productsService.updateStockProduct(id,number)
    res.send({status:"success", payload:result})
}

export const deleteProduct = async(req, res) => {
    const id = req.params.id
    const result = await productsService.deleteProduct(id)

    res.send({status:"success", payload:result})
}