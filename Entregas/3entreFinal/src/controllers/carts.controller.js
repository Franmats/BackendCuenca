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
        const cid = req.params.cid
        const result = await cartsService.getCartByID(cid)
        /* console.log(JSON.stringify(result,null,"\t")); */
        res.send({status:"success", payload:result})
    } catch (error) {
        console.log(error);   
    }
}

export const putProductInCart = async (req,res)=> {
    const cid = req.params.cid
    const pid = req.params.pid
    const qua = req.params.qua

    const result = await cartsService.putProductInCart(cid,pid,qua)
    res.send({status:"success", payload:result})

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
    const cid = req.params.cid
    const result = await cartsService.getCartDetailsForView(cid)
    console.log("desde controller",result);
    res.render("carts",{result})
}




