import mongoose from "mongoose";

const UserModel = mongoose.model("users", new mongoose.Schema({
    email: {
        type:String,
        unique:true
    },
    password:String,
    first_name:String,
    last_name:String,
    age:Number,
    role:String,
    cart: {type:{
        id:String,
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"cart"
        },
        quantity:Number,

    }}
}))

export default UserModel

/* import mongoose from "mongoose";

const userCollection = "users"

const userSchema = mongoose.Schema({

    email: {
        type:String,
        unique:true
    },
    password:String,
    first_name:String,
    last_name:String,
    age:Number,
    role:String,
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"carts"
    }
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel */