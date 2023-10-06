import { Router } from "express";
import { getTickets,createTicket } from "../controllers/ticket.controller.js";

const router = Router()

router.get("/",getTickets)
router.post("/",createTicket)

export default router