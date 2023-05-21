const express = require("express");
const {
  getCandidatesForElection,
} = require("../../controllers/ElectionController");
const {
  getVoterById,
  Login,
  Logout,
  castVote,
  getVoterWallet,
} = require("../../controllers/VoterController");
const { verifyVoterLogin } = require("../../utils/validations");
const VoterRoutes = express.Router();

VoterRoutes.post("/voter/login", Login);
VoterRoutes.post("/voter/logout", verifyVoterLogin, Logout);
VoterRoutes.get("/voter/my-data", verifyVoterLogin, getVoterById);
//TODO
VoterRoutes.post("/voter/get-election-candidates/", getCandidatesForElection);
VoterRoutes.get("/voter/get-wallet", verifyVoterLogin, getVoterWallet);
VoterRoutes.post("/voter/cast-vote", verifyVoterLogin, castVote);

module.exports = VoterRoutes;
