export default class CartsDTO {
    constructor(cart){
        this.products = cart.products /* [{
            id:cart.pid || "0",
            product:{
                id : cart.pid,              
            },
            quantity:cart.quantity|| 0
        }] */
    }
}