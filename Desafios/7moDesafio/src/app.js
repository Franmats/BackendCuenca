import express from "express"
import productsRoute from "./routes/products.routes.js"
import prodRoute from "./routes/prod.routes.js"
import erroHanler from "./middlewares/error.js"

const app = express()
app.use(express.json())
app.use("/mockingproducts", productsRoute)
app.use("/products",prodRoute)
app.use(erroHanler)


app.listen(8080,()=> console.log("listenim¿ng"))