const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketControllers");
const validate = require("../middlewares/validationMiddleware");

const ticketRules = {
  seatNumber: "required|string",
  price: "required|numeric",
  customerName: "required|string",
  showtimeId: "required|integer",
};

router.get("/", ticketController.getAllTickets);
router.post("/", validate(ticketRules), ticketController.createTicket);
router.get("/:id", ticketController.getTicketById);
router.put("/:id", ticketController.updateTicket);
router.delete("/:id", ticketController.deleteTicket);

module.exports = router;
