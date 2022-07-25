const planet = require("../../models/planet.model");

function getAllPlanets(req, res) {
  res.status(200).json(planet);
}

module.exports = {
  getAllPlanets,
};
