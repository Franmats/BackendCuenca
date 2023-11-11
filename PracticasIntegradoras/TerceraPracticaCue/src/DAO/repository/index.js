import { Users/* ,Products */,Carts, Ticket,ProductsView } from "../factory.js";
import UsersRepository from "./users.repository.js";
import ProductsRepository from "./products.repository.js"
import CartsService from "./carts.repository.js"
import TicketRepository from "./tickets.repository.js";
import ProductViewRepository from "./productsview.repository.js";

export const usersService = new UsersRepository(new Users())
/* export const productsService = new ProductsRepository(new Products()) */
export const cartsService = new CartsService(new Carts())
export const ticketService = new TicketRepository(new Ticket())
export const productoviewService = new ProductViewRepository(new ProductsView())

//Primero importa las clases que segun las persistencia a utlizar son las que va a importar
//Segundo exporta una clase que contiene todos los metodos a utilizar recibiendo como parametro la clase que contiene la el tipo de persistencia que con la que va a funcionar