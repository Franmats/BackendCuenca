import mongoose from "mongoose";

const ticketModel = mongoose.model("ticket", new mongoose.Schema({
    code: String,
    purchase_datetime:String,
    amount:Number,
    purchaser:String
}))



export default ticketModel