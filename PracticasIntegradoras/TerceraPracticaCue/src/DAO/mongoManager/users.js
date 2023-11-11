import UserModel from "./models/user.model.js"
import CartModel from "./models/cart.model.js"

export default class User {

    getUserByEmail = async (emailjson) => {return await UserModel.findOne(emailjson)}

    createUser = async (newUser) => { return await UserModel.create(newUser)}

    getUserByID = async (id) => {return await UserModel.findById(id)}

}