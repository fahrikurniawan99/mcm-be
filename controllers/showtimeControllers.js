const Film = require("../models/Film");
const Showtime = require("../models/ShowTime");
const { sendResponse } = require("../utils/response");

exports.getAllShowtimes = async (req, res, next) => {
  try {
    const showtimes = await Showtime.findAll({
      include: [
        {
          model: Film,
          as: "film",
          attributes: ["title", "duration", "description"],
        },
      ],
    });
    sendResponse(res, 200, true, "Showtimes retrieved successfully", showtimes);
  } catch (err) {
    next(err);
  }
};

exports.createShowtime = async (req, res, next) => {
  try {
    const film = await Film.findByPk(req.body.filmId);
    if (!film) return sendResponse(res, 404, false, "Film not found");
    const duplicateShowtime = await Showtime.findOne({
      where: {
        filmId: req.body.filmId,
        time: req.body.time,
      },
    });
    if (duplicateShowtime) {
      return sendResponse(
        res,
        400,
        false,
        "Showtime already exists for this film at the specified time"
      );
    }
    const showtime = await Showtime.create(req.body);
    sendResponse(res, 201, true, "Showtime created successfully", showtime);
  } catch (err) {
    next(err);
  }
};

exports.getShowtimeById = async (req, res, next) => {
  try {
    const showtime = await Showtime.findByPk(req.params.id, {
      include: [
        {
          model: Film,
          as: "film",
          attributes: ["title", "duration", "description"],
        },
      ],
    });
    if (!showtime) return sendResponse(res, 404, false, "Showtime not found");
    sendResponse(res, 200, true, "Showtime retrieved successfully", showtime);
  } catch (err) {
    next(err);
  }
};

exports.updateShowtime = async (req, res, next) => {
  try {
    const film = await Film.findByPk(req.body.filmId);
    if (!film && req.body.filmId)
      return sendResponse(res, 404, false, "Film not found");
    const duplicateShowtime = await Showtime.findOne({
      where: {
        filmId: req.body.filmId,
        time: req.body.time,
        id: { $ne: req.params.id },
        },
    });
    if (duplicateShowtime) {
      return sendResponse(res, 400, false, "Showtime already exists for this film at the specified time");
    }
    const showtime = await Showtime.findByPk(req.params.id);
    if (!showtime) return sendResponse(res, 404, false, "Showtime not found");
    await showtime.update(req.body);
    sendResponse(res, 200, true, "Showtime updated successfully", showtime);
  } catch (err) {
    next(err);
  }
};

exports.deleteShowtime = async (req, res, next) => {
  try {
    const showtime = await Showtime.findByPk(req.params.id);
    if (!showtime) return sendResponse(res, 404, false, "Showtime not found");
    await showtime.destroy();
    sendResponse(res, 200, true, "Showtime deleted successfully");
  } catch (err) {
    next(err);
  }
};
