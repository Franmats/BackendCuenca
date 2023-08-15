class ProductManager {
    constructor() {
        this.products= []
    }
    getNextId = () => {
        const count = this.products.length
        //[0,1,2,3,4,5] count = 6, count -1 = 5 obtengo el ultimo objeto y obtengo su id
        const nextID = (count > 0 ) ? this.products[count - 1].id + 1 : 1 
        return nextID
    }

    getProducts= () => {return this.products}
    addProduct = (title, description, price, thumbnail, code, stock) => {
        const producto = {
            id: this.getNextId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        //VALIDACION QUE TODOS LOS ESPACIOS DE LOS PRDOCUTOS ESTEN LLENOS QUE TENGA TODOS LOS PARAMETROS (la idea es q si falta un parametro no lo pushee en el array de productos)
        let espaciosVacios = () => {
            let a = Object.values(producto).includes(undefined)// recorre el objeto producto convetido en array y asi no lo pushea al array principal
            let bolean = a ? console.log("Hay espacios vacios") : false
            return bolean
        }
       

        // VALIDACION QUE TODOS LOS PRODUCTOS TENGAN DIFERENTE CODE
        let codigoRepe = () => { 
            let a = this.products.filter(e => e.code == code) 
            let bolean = (a.length > 0) ? console.log("Hay un codigo repetido") :  false
            return bolean
        }


        // CONDICION FINAL PARA QUE LOS PUSHEE AL ARRAY
        if (espaciosVacios() === false && codigoRepe() === false) {

           this.products.push(producto)

        }
    }

    //METODO PARA BUSCAR UN PRODUCTO SEGUN ID
    getProductById = (id) => {

        const productoFiltrado = this.products.filter(e => e.id == id)
        
        if (productoFiltrado.length > 0 && typeof id == "number") { //VALIDO CON EL TYPE OF QUE LA ENTRADA DEL PARAMETRO SE SOLO UN NUMERO
            return console.log ("El producto buscado",productoFiltrado)
        } else {
            return console.log("Not Found") }
    }
}

const manager = new ProductManager()
console.log("Array de Productos Vacio",manager.getProducts())

manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 23) // PRODUCTO NORMAL
manager.addProduct("producto prueba 2 ", "Este es un producto prueba", 2200, "Sin imagen", "abc1", 26) // PRODCUTO NORMAL
manager.addProduct("producto prueba 3 ", "Este es un producto prueba", 200, "Sin imagen", "abc15") // PRODUCTO CON UN PARAMETRO VACIO
manager.addProduct("producto con code REPETIDO ", "Este es un producto prueba", 22, "Sin imagen", "abc123", 26) // PRODUCTO CON CODE REPETIDO
console.log("Array con Productos", manager.getProducts())

manager.getProductById(2)

