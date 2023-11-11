import ticketModel from "./models/ticket.model.js";

export default class Ticket {

    getTickets = async()=> {return await ticketModel.find()}

    createTicket = async(json) => {return await ticketModel.create(json)}

    getTicketById = async(id) => {return await ticketModel.findById(id)}



}