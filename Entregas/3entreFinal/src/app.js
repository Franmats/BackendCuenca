//Librerias y Frameworks
import express from "express"
import handlebars from "express-handlebars"
import MongoStore from "connect-mongo"
import session from "express-session"
import passport from "passport"
import {Server} from "socket.io"
import config from "./config/config.js"

//Rutas
import productsprueba from "./routes/products.prueba.js"
import cartpruea from "./routes/cart.prueba.js"
import userRouter from "./routes/users.router.js"
import ticketRouter from "./routes/ticket.prueba.js"
/* import routerViews from "./routes/views.router.js"
import routerProducts from "./routes/products.route.js"
import routerCart from "./routes/cart.router.js"
import sessionRouter from "./routes/session.router.js"
import viewsRouter from "./routes/views.router.js"
 */
//Logicas
import { ProductManager } from "./DAO/fileManager/ProductManager.js"
import __dirname from "./utils.js"
import initializePassport from "./config/passport.config.js"


const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())




//sockets y Http
/* const httpServer = app.listen(8080, () => console.log("Listening....."))
const io = new Server(httpServer) */


//LOGIN
app.use(session({
    store:MongoStore.create({
        mongoUrl:config.dbUrl,
        dbName:config.dbName,
        mongoOptions:{
            useNewUrlParser:true,
            useUnifiedTopology:true
        },
        ttl:220
    }),
    secret:"secret",
    resave:true,
    saveUninitialized:true
}))


//Multer
app.use("/static",express.static(__dirname + "/public"))
//Handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")


//Rutas Principales
/* app.use("/api/products",routerProducts)
app.use("/api/carts",viewsRouter) */
app.use("/prueba",productsprueba)
app.use("/cart",cartpruea)
app.use("/api/session",userRouter)
app.use("/purchase",ticketRouter)

//Apertura de Servidor
app.listen(8080,()=>{console.log("listen")})

/* //Login
app.use("/api/session", sessionRouter)
app.use("/",viewsRouter)

//Login con github
app.use("/", sessionRouter)
app.use("/api/session", sessionRouter) */

//Config de passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())


