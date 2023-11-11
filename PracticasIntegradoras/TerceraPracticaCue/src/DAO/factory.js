import config from "../config/config.js"
import mongoose from "mongoose"

/* export let Products */
export let Carts
export let Users
export let Ticket
export let ProductsView
console.log(`Persistencia con ${config.persistence}`)

switch (config.persistence) {
    case "MONGO":
        mongoose.connect(config.dbUrl,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            dbName:config.dbName
        })

        const {default: UserMongo } = await import("./mongoManager/users.js")
        /* const {default: ProductsMongo } = await import("./mongoManager/products.js") */
        const {default: CartsMongo } = await import("./mongoManager/carts.js")
        const {default: TicketsMongo } = await import("./mongoManager/ticket.js")
        const {default: ProductsViewMongo } = await import("./mongoManager/productsview.js")

        Users = UserMongo
        /* Products = ProductsMongo */
        Carts = CartsMongo
        Ticket = TicketsMongo
        ProductsView = ProductsViewMongo
        break;

    default:

        console.log("Error en factory");
        break;
}