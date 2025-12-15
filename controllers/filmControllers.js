const Film = require("../models/Film");
const Studio = require("../models/Studio");
const { sendResponse } = require("../utils/response");

exports.getAllFilms = async (req, res, next) => {
  try {
    const films = await Film.findAll({
      include: [
        {
          model: Studio,
          as: "studio",
          attributes: ["name", "location"],
        },
      ],
    });
    sendResponse(res, 200, true, "Films retrieved successfully", films);
  } catch (err) {
    next(err);
  }
};

exports.createFilm = async (req, res, next) => {
  try {
    const studio = await Studio.findByPk(req.body.studioId);
    if (!studio) return sendResponse(res, 404, false, "Studio not found");
    const film = await Film.create(req.body);
    sendResponse(res, 201, true, "Film created successfully", film);
  } catch (err) {
    next(err);
  }
};

exports.getFilmById = async (req, res, next) => {
  try {
    const film = await Film.findByPk(req.params.id, {
      include: [
        {
          model: Studio,
          as: "studio",
          attributes: ["name", "location"],
        },
      ],
    });
    if (!film) return sendResponse(res, 404, false, "Film not found");
    sendResponse(res, 200, true, "Film retrieved successfully", film);
  } catch (err) {
    next(err);
  }
};

exports.updateFilm = async (req, res, next) => {
  try {
    const studio = await Studio.findByPk(req.body.studioId);
    if (!studio && req.body.studioId) return sendResponse(res, 404, false, "Studio not found");
    const film = await Film.findByPk(req.params.id);
    if (!film) return sendResponse(res, 404, false, "Film not found");
    await film.update(req.body);
    sendResponse(res, 200, true, "Film updated successfully", film);
  } catch (err) {
    next(err);
  }
};

exports.deleteFilm = async (req, res, next) => {
  try {
    const film = await Film.findByPk(req.params.id);
    if (!film) return sendResponse(res, 404, false, "Film not found");
    await film.destroy();
    sendResponse(res, 200, true, "Film deleted successfully");
  } catch (err) {
    next(err);
  }
};
