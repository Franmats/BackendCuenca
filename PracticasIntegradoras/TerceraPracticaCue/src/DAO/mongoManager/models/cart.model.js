import mongoose from "mongoose";

/* const CartModel = mongoose.model("carts", new mongoose.Schema({
    products: {
        type:[{
            id:String,
            quantity:Number,
            ref:"products"
        }]
    }
})) */

const CartSchema = mongoose.Schema({
    products: [
        
        {   
            cid:String,
            pid:{type: mongoose.Schema.Types.ObjectId, ref: "products"},
            quantity: {
                type: Number,
                default: 1,
              }
        }
    ],
    total:Number
})

const CartModel = mongoose.model("carts",CartSchema)


export default CartModel