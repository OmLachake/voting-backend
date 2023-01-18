const express = require("express");
const {
  getVoterById,
  Login,
  Logout,
} = require("../../controllers/VoterController");
const { verifyVoterLogin } = require("../../utils/validations");
const VoterRoutes = express.Router();

VoterRoutes.get("/voter/:id", verifyVoterLogin, getVoterById);
VoterRoutes.post("/voter/login", verifyVoterLogin, Login);
VoterRoutes.post("/voter/logout", verifyVoterLogin, Logout);
//TODO
VoterRoutes.post("/voter/get-election-candidates", verifyVoterLogin);
VoterRoutes.post("/voter/cast-vote", verifyVoterLogin);
VoterRoutes.post("/voter/get-wallet", verifyVoterLogin);
VoterRoutes.post("/voter/cast-vote", verifyVoterLogin);

module.exports = ModeratorRoutes;
