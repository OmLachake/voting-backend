const express = require("express");
const VoterAdministrationRoutes = express.Router();

const {
  createVoter,
  getVoterById,
  updateVoter,
  addElectionToVoter,
  deleteVoter,
  verifyVoter,
} = require("../../controllers/VoterController");

VoterAdministrationRoutes.get("/all-voters", getAllVoters);
VoterAdministrationRoutes.get("/:id", getVoterById);
VoterAdministrationRoutes.post("/", createVoter);
VoterAdministrationRoutes.post("/verify-voter/:id", verifyVoter);
VoterAdministrationRoutes.put("/:id", updateVoter);
VoterAdministrationRoutes.put("/:id/add-election", addElectionToVoter);
VoterAdministrationRoutes.delete("/:id", deleteVoter);

module.exports = VoterAdministrationRoutes;
