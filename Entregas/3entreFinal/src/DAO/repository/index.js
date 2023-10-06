import { Users,Products,Carts, Ticket } from "../factory.js";
import UsersRepository from "./users.repository.js";
import ProductsRepository from "./products.repository.js"
import CartsService from "./carts.repository.js"
import TicketRepository from "./tickets.repository.js";

export const usersService = new UsersRepository(new Users())
export const productsService = new ProductsRepository(new Products())
export const cartsService = new CartsService(new Carts())
export const ticketService = new TicketRepository(new Ticket)