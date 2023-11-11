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

//DTO
//Data Transfer Object 
//Clase que filtra los fatos para ingresen o egresen de la bases datos con el formato correcto. Filtra la transferencia 
// de datos entre el user y la BD
