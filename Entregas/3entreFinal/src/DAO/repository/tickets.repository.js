import TicketsDTO from "../DTO/ticket.dto.js"

export default class TicketRepository {
    constructor(dao){
        this.dao = dao
    }

    getTickets = async()=> {return await this.dao.getTickets()}

    createTicket = async(json) => {
        const result = new TicketsDTO(json)
        
        return await this.dao.createTicket(result)}

    getTicketById = async(id) => {return await this.dao.getTicketById(id)}
}