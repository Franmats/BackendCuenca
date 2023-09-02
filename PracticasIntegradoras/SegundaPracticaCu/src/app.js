import express from "express"
import handlebars from "express-handlebars"
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

//MONGODB
const uri = "mongodb+srv://franmats:Casdf670120@cluster0.hi4ljaw.mongodb.net/"


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

mongoose.set("strictQuery",false)
mongoose.connect(uri, {dbName:"ecommerce"})
    .then(()=> {
                console.log("connected");
                app.listen(8080,()=> console.log("lisnening"))
            }) 
    

//Rutas
app.use("/api/products",routerProducts)
app.use("/api/carts",routerCart)

//Login Local
app.use("/",viewsRouter) 

//Login con github
app.use("/api/session", sessionRouter)

//Config de passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

/* mongoose.connect(uri,{dbName})
    .then(()=> {
        console.log("connected");
        app.listen(8080,()=> console.log("lisnening"))
    }) */

