import { ticketService } from "../DAO/repository/index.js";

export const getTickets = async(req,res)=> {
    const result = await ticketService.getTickets()
    res.send({status:"succes",payload: result})
}

export const createTicket = async(req,res)=> {
    const ticket = req.body
    const result = await ticketService.createTicket(ticket)
    res.send({status:"succes",payload: result})
}