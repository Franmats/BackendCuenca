import {cartsService} from "../DAO/repository/index.js"

export const getCarts = async (req,res)=> {

    const result = await cartsService.getCarts()
    console.log(result);
    
    res.send({status:"success", payload:result})
}

export const createCart = async(req,res)=> {
    const result = await cartsService.createCart({products:[]})
    res.send({status:"success", payload:result})
}

export const getCartByID = async(req,res)=> {
    try {
        const cid = req.session.user.cart
        const result = await cartsService.getCartByID(cid)
        /* console.log(JSON.stringify(result,null,"\t")); */
        res.render("carts",result)
    } catch (error) {
        console.log(error);   
    }
}

export const putProductInCart = async (req,res)=> {
    const cid = req.params.cid
    const pid = req.params.pid
    const qua = req.params.qua

    const result = await cartsService.putProductInCart(cid,pid,qua)
    result
    res.render("middlecart")

} 

export const deleteProductCartByID = async (req,res)=> {
    const cid = req.params.cid
    const pid = req.params.pid

    const result = await cartsService.deleteProductCartByID(cid,pid)
    res.send({status:"success", payload:result})
}

export const updateQuantityOfProductInCart = async(req,res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const nuevaCant = req.body

    const result = await cartsService.updateQuantityOfProductInCart(cid,pid,nuevaCant)
    res.send({status:"success", payload:result})
}

export const deleteProductsInCart = async(req,res)=> {
    const cid = req.params.cid
    const result = await cartsService.deleteProductsInCart(cid)
    res.send({status:"success", payload:result}) 
}

export const getCartDetailsForView = async (req,res)=> {
    const cid = req.session.user.cart
    const cart = await cartsService.getCartDetailsForView(cid)

    /* const paraHandlebars ={docs:a} */
   
    
    console.log("desde controller",cart);
    res.render("carts",cart)
}

//CONTROLLERS 
//Esporta las funciones req y res para ser utilizadas en las rutas. Una accion por funcion.




