import CartModel from "./models/cart.model.js"

export default class Cart {

    getCarts = async () => { return await CartModel.find()/* .populate("products.product") */}

    createCart = async (a) => {return await CartModel.create(a)}

    getCartByID = async (cid) => {
      
      const result = await CartModel.findOne({_id:cid}).populate("products.product")
      console.log(JSON.stringify(result,null,"\t"));
      return result}

    putProductInCart = async (result) => {
        try{
            const carrito =  await CartModel.findById(result.cid)
            const cid =result.cid
            const pid = result.pid
            const qua = parseInt(result.qua)


            const s = {cid,pid,quantity:qua}
            console.log(s);
            carrito.products.push(s)
            carrito.save()
            
        }catch{
            console.log("Error al poner el Producto");
        }


    } //Colocar un producto en un determinado carrito

    deleteProductCartByID = async (cid,pid) => {
        try{
            const carrito =  await CartModel.findById(cid)
            const modificacion = carrito.products.filter(e => e.id != pid)
      
            let resultado = await CartModel.updateOne({_id : cid},{$set:{products : modificacion}})
            res.send(resultado)
      
          }catch {
            console.log("Error al eliminar el Producto del Carrito ")
          }

    }

    updateQuantityOfProductInCart = async (cid,pid,nuevaCant) => {
        try{

            let resultado = await CartModel.updateOne({_id : cid ,"products.id": pid},{ $set: { "products.$.quantity": nuevaCant.quantity}} )
            res.send({success:"sucess"})
            
          }catch{
            console.log("Error al Actualizar carrito")
          }
    }

    deleteProductsInCart = async (cid) => {
        try{

            let resultado = await CartModel.updateOne({_id : cid},{products : []})
            res.send(resultado)
        
          }catch {
            console.log("Error al vaciar carrito ")
          }
    } 
    
    getCartDetailsForView = async (cid) =>  {
      try {
        const result = await CartModel.findOne({_id:cid}).populate("products.pid").lean().exec();
    
        /*const productObjects = result .map(item => item.product) */
        return result
    } catch (error) {
        console.log(error);   
    }
    }



}

//Clase que contiene los metodos de interacion con la base de datos 