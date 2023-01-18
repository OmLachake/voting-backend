const express = require("express");
const VoterAdministrationRoutes = require("./VoterAdministrationRoutes");
const ModeratorRoutes = express.Router();

ModeratorRoutes.add("/moderator/voter", isModerator, VoterAdministrationRoutes);

module.exports = ModeratorRoutes;
