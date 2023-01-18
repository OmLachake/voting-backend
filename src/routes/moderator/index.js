const express = require("express");
const { isModerator } = require("../../utils/validations");
const VoterAdministrationRoutes = require("./VoterAdministrationRoutes");
const ModeratorRoutes = express.Router();

ModeratorRoutes.use("/moderator/voter", isModerator, VoterAdministrationRoutes);

module.exports = ModeratorRoutes;
