export default class TicketsDTO {
    constructor(ticket){
        
        this.code = Math.random().toString(36).substring(2, 8)
        this.purchase_datetime = new Date()
        this.amount = ticket.amount
        this.purchaser = ticket.purchaser
    }
}