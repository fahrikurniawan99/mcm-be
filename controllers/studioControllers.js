const Studio = require("../models/Studio");
const { sendResponse } = require("../utils/response");

exports.getAllStudios = async (req, res, next) => {
  try {
    const studios = await Studio.findAll();
    sendResponse(res, 200, true, "Studios retrieved successfully", studios);
  } catch (err) {
    next(err);
  }
};

exports.createStudio = async (req, res, next) => {
  try {
    const studio = await Studio.create(req.body);
    sendResponse(res, 201, true, "Studio created successfully", studio);
  } catch (err) {
    next(err);
  }
};

exports.getStudioById = async (req, res, next) => {
  try {
    const studio = await Studio.findByPk(req.params.id);
    if (!studio) return sendResponse(res, 404, false, "Studio not found");
    sendResponse(res, 200, true, "Studio retrieved successfully", studio);
  } catch (err) {
    next(err);
  }
};

exports.updateStudio = async (req, res, next) => {
  try {
    const studio = await Studio.findByPk(req.params.id);
    if (!studio) return sendResponse(res, 404, false, "Studio not found");
    await studio.update(req.body);
    sendResponse(res, 200, true, "Studio updated successfully", studio);
  } catch (err) {
    next(err);
  }
};

exports.deleteStudio = async (req, res, next) => {
  try {
    const studio = await Studio.findByPk(req.params.id);
    if (!studio) return sendResponse(res, 404, false, "Studio not found");
    await studio.destroy();
    sendResponse(res, 200, true, "Studio deleted successfully");
  } catch (err) {
    next(err);
  }
};
