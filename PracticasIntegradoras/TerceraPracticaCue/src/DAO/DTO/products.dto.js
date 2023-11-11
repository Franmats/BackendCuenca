export default class ProductsDTO {
    constructor(product){
        this.nombre = product.nombre
        this.nombreTag = product.nombreTag
        this.idCategoria = product.idCategoria
        this.descripcion = product.descripcion
        this.imagen = product.imagen
        this.precio = product.precio
        this.stock = product.stock
    }
}