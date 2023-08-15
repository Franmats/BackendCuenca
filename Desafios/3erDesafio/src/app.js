
import {ProductManager} from "./ProductManager.js"
import express from "express"

const app = express()

const main = async() => {
    const manager = new ProductManager("BD.json")
    console.log("Productos222",await manager.getProducts())
    manager.addProduct("producto prueba 1", "Este es un producto prueba", 200, "Sin imagen", "abc123",23)
    manager.addProduct("producto prueba 2", "Este es un producto prueba", 200, "Sin imagen", "abc466", 24)
    manager.addProduct("producto pruena 3", "Este es un producto prueba", 200, "Sin imagen", "abc4545",25)
    manager.addProduct("producto prueba 4", "Este es un producto prueba", 100, "Sin imagen", "abc4544",24)
    manager.addProduct("producto prueba 5", "Este es un producto prueba", 100, "Sin imagen", "abc4546",24)
    manager.addProduct("producto prueba 6", "Este es un producto prueba", 100, "Sin imagen", "abc4547",24)
    manager.addProduct("producto prueba 7", "Este es un producto prueba", 100, "Sin imagen", "abc4547",24)
    manager.addProduct("producto prueba 8", "Este es un producto prueba", 100, "Sin imagen", "abc4549",24)
    manager.addProduct("producto prueba 9", "Este es un producto prueba", 100, "Sin imagen", "abc4550",24)
    manager.addProduct("producto prueba 10", "Este es un producto prueba", 100, "Sin imagen", "abc4551",24) 
/*     console.log(await manager.deleteProduct(3))
    console.log(await manager.updateProduct(1,"price",21)) */
    console.log("Productos",await manager.getProducts())
}

main()
let productos = manager.getProducts()

app.get("/", (request, response) => {
    let limit = request.query.limit
    console.log(limit)
    if (limit) {
        limit = limit.toLocaleLowerCase()
        const ProdFilter = productos.filter(e => e.id <= limit)
        return response.send(ProdFilter)
    }
})

app.get("/:productos",(request, response) => {
    response.send(productos)
})

app.get("/productos/:id",(request, response) => {
    const id = parseInt(request.params.id)
    const prod = productos.find(e => e.id === id)

    if (!prod) response.send({error:"Prodcuto no encontrado"})
    else response.send(prod)
})



app.listen(8080, () => console.log("Running on 8080..."))