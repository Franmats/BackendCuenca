/* import mongoose from "mongoose";

const UserModel = mongoose.model("users", new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    age:Number,
    password:String
}))

export default UserModel */

import mongoose from "mongoose";

const userCollection = "users"

const userSchema = mongoose.Schema({

    email: {
        type:String,
        unique:true
    },
    password:String,
    first_name:String,
    age:Number,
    password:String
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel