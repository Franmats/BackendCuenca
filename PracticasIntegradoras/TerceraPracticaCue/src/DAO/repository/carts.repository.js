import CartsDTO from "../DTO/carts.dto.js"

export default class CartsService {

    constructor(dao){
        this.dao = dao
    }

    getCarts = async () => { return await this.dao.getCarts()}

    createCart = async (a) => {
        const result = new CartsDTO(a)
        console.log("aaa",result);
        return await this.dao.createCart(result)}

    getCartByID = async (cid) => {return await this.dao.getCartByID(cid)}

    putProductInCart = async (cid,pid,qua) => { 
        return await this.dao.putProductInCart({cid,pid,qua})}

    deleteProductCartByID = async (cid,pid) => {return await this.dao.deleteProductCartByID(cid,pid)}

    updateQuantityOfProductInCart = async (cid,pid,nuevaCant) => { return await this.dao.updateQuantityOfProductInCart(cid,pid,nuevaCant)}

    deleteProductsInCart = async (cid) => {return await this.dao.deleteProductsInCart(cid)}

    getCartDetailsForView = async (cid) => {return await this.dao.getCartDetailsForView(cid)}
}

//Servicio
//Clase que contiene metodos que en funcion de la clase de datos utilizara los metodos que corresponden
//Tambien es en donde se utiliza el DTO