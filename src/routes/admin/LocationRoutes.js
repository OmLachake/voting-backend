const express = require("express");
const LocationRoutes = express.Router();

LocationRoutes.post("/create", createLocation);
LocationRoutes.get("/", getAllLocations);
LocationRoutes.get("/:id", getLocationById);
LocationRoutes.put("/:id", updateLocation);
LocationRoutes.delete("/:id", deleteLocation);

module.exports = LocationRoutes;
