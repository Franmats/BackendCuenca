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
    products: {
        type:[{
            id:String,
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"products"
            },
            quantity:Number,

        }]
    }
})

const CartModel = mongoose.model("carts",CartSchema)


export default CartModel