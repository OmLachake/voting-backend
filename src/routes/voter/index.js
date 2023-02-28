const express = require("express");
const {
  getCandidatesForElection,
} = require("../../controllers/ElectionController");
const {
  getVoterById,
  Login,
  Logout,
  castVote,
} = require("../../controllers/VoterController");
const { verifyVoterLogin } = require("../../utils/validations");
const VoterRoutes = express.Router();

VoterRoutes.post("/voter/login", Login);
VoterRoutes.post("/voter/logout", verifyVoterLogin, Logout);
VoterRoutes.get("/voter/my-data", verifyVoterLogin, getVoterById);
//TODO
VoterRoutes.get("/voter/get-election-candidates/", getCandidatesForElection);
VoterRoutes.get("/voter/get-wallet", verifyVoterLogin);
VoterRoutes.post("/voter/cast-vote", verifyVoterLogin, castVote);

module.exports = VoterRoutes;
