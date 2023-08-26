import express from "express"
import handlebars from "express-handlebars"
import {Server} from "socket.io"
import mongoose from "mongoose"
import routerViews from "./routes/views.router.js"
import routerProducts from "./routes/products.route.js"
import routerCart from "./routes/cart.router.js"
import { ProductManager } from "./DAO/fileManager/ProductManager.js"
import __dirname from "./utils.js"
import session from "express-session"
import MongoStore from "connect-mongo"
import passport from "passport"
import sessionRouter from "./routes/session.router.js"
import viewsRouter from "./routes/views.router.js"
import initializePassport from "./config/passport.config.js"

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const conected =() => {
    //Conexion de sockets 
    io.on("connection", socket => {
        socket.on("new-product", async product => {//io para que se actualice en todas las pantallas o cokets, en cambio con socket solo actualizara el user q este conectado
            const manager = new ProductManager()
            await manager.addProduct(product)  
            
            const products1= await manager.getProducts()
            socket.emit("recargar-tabla", products1)
        })

        socket.on("eliminar-producto", async id2 => {
            const manager = new ProductManager()
            console.log(id2);
            await manager.deleteProduct(id2)

            const products1= await manager.getProducts()
            socket.emit("recargar-tabla", products1)
        })

})
}


//MONGODB
const uri = "mongodb+srv://franmats:Casdf670120@cluster0.hi4ljaw.mongodb.net/"
mongoose.set("strictQuery",false)
/* mongoose.connect(uri, {dbName:"ecommerce"})
    .then(() => console.log("db connected"))
    .then(() => app.listen(8080, ()=> console.log("Listenning")) ) */


//sockets y Http
/* const httpServer = app.listen(8080, () => console.log("Listening....."))
const io = new Server(httpServer) */
//Multer
app.use("/static",express.static(__dirname + "/public"))
//Handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

//LOGIN
const dbName = "sessions"
app.use(session({
    store:MongoStore.create({
        mongoUrl:uri,
        dbName:dbName,
        mongoOptions:{
            useNewUrlParser:true,
            useUnifiedTopology:true
        },
        ttl:205
    }),
    secret:"secret",
    resave:true,
    saveUninitialized:true
}))



//Rutas
app.use("/api/products",routerProducts)
app.use("/api/carts",routerCart)
//Login
/* app.use("/api/session", sessionRouter)
app.use("/",viewsRouter) */

//Login con github
app.use("/", viewsRouter)
app.use("/api/session", sessionRouter)

//Config de passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())



mongoose.connect(uri,{dbName})
    .then(()=> {
        console.log("connected");
        app.listen(8080,()=> console.log("lisnening"))
    })

