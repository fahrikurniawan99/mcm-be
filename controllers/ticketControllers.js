const { Sequelize } = require("sequelize");
const Film = require("../models/Film");
const Showtime = require("../models/ShowTime");
const Ticket = require("../models/Ticket");
const { sendResponse } = require("../utils/response");
const Studio = require("../models/Studio");

exports.getAllTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.findAll({
      include: [
        {
          model: Showtime,
          as: "showtime",
          attributes: ["filmId", "time"],
          include: [
            {
              model: Film,
              as: "film",
              attributes: ["title", "duration", "description"],
              include: [
                {
                  model: Studio,
                  as: "studio",
                  attributes: ["name", "location"],
                },
              ],
            },
          ],
        },
      ],
    });
    sendResponse(res, 200, true, "Tickets retrieved successfully", tickets);
  } catch (err) {
    next(err);
  }
};

exports.createTicket = async (req, res, next) => {
  try {
    const showtime = await Showtime.findByPk(req.body.showtimeId);
    if (!showtime) return sendResponse(res, 404, false, "Showtime not found");
    const duplicateTicket = await Ticket.findOne({
      where: {
        showtimeId: req.body.showtimeId,
        seatNumber: req.body.seatNumber,
      },
    });
    if (duplicateTicket) {
      return sendResponse(
        res,
        400,
        false,
        "Ticket already exists for this seat at the specified showtime"
      );
    }
    const ticket = await Ticket.create(req.body);
    sendResponse(res, 201, true, "Ticket created successfully", ticket);
  } catch (err) {
    next(err);
  }
};

exports.getTicketById = async (req, res, next) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id, {
      include: [
        {
          model: Showtime,
          as: "showtime",
          attributes: ["filmId", "time"],
          include: [
            {
              model: Film,
              as: "film",
              attributes: ["title", "duration", "description"],
              include: [
                {
                  model: Studio,
                  as: "studio",
                  attributes: ["name", "location"],
                },
              ],
            },
          ],
        },
      ],
    });
    if (!ticket) return sendResponse(res, 404, false, "Ticket not found");
    sendResponse(res, 200, true, "Ticket retrieved successfully", ticket);
  } catch (err) {
    next(err);
  }
};

exports.updateTicket = async (req, res, next) => {
  try {
    const showtime = await Showtime.findByPk(req.body.showtimeId);
    if (!showtime && req.body.showtimeId)
      return sendResponse(res, 404, false, "Showtime not found");
    if (req.body.showtimeId) {
      const duplicateTicket = await Ticket.findOne({
        where: {
          showtimeId: req.body.showtimeId,
          seatNumber: req.body.seatNumber,
          id: { $ne: req.params.id },
        },
      });
      if (duplicateTicket) {
        return sendResponse(
          res,
          400,
          false,
          "Ticket already exists for this seat at the specified showtime"
        );
      }
    }
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return sendResponse(res, 404, false, "Ticket not found");
    await ticket.update(req.body);
    sendResponse(res, 200, true, "Ticket updated successfully", ticket);
  } catch (err) {
    next(err);
  }
};

exports.deleteTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return sendResponse(res, 404, false, "Ticket not found");
    await ticket.destroy();
    sendResponse(res, 200, true, "Ticket deleted successfully");
  } catch (err) {
    next(err);
  }
};
