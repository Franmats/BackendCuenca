import ProductModel from "./models/product.model.js"

export default class Product {

    getProducts = async () => { return await ProductModel.find()}

    getProductByID = async (id) => { return await ProductModel.findById(id)}

    createProduct = async (product) =>  { return await  ProductModel.create(product)}

    updateStockProduct = async (id,number) => {return await ProductModel.updateOne({_id:id},{$set:{stock:number}})}

    deleteProduct = async(id) => { return await ProductModel.deleteOne({_id:id})}

}