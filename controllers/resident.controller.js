const Resident = require("../models/resident.model");
const Document = require("../models/document.model");

exports.createResidents = async (req, res) => {
  try {
    return res.status(404).end("WIP");
  } catch (err) {
    res.status(500).end(`An error occurred: ${err.message}`);
  }
};

exports.getResidents = async (req, res) => {
  try {
    return res.status(404).end("WIP");
  } catch (err) {
    res.status(500).end(`An error occurred: ${err.message}`);
  }
};

exports.updateResidents = async (req, res) => {
  try {
    return res.status(404).end("WIP");
  } catch (err) {
    res.status(500).end(`An error occurred: ${err.message}`);
  }
};

exports.deleteResidents = async (req, res) => {
  try {
    return res.status(404).end("WIP");
  } catch (err) {0
    res.status(500).end(`An error occurred: ${err.message}`);
  }
};
