const express = require("express");
const {
  createElection,
  getAllElections,
  getElectionById,
  getCompletedElections,
  getCancelledElections,
  updateElection,
  deactivateElection,
  getActiveElections,
} = require("../../controllers/ElectionController");
const ElectionRoutes = express.Router();

ElectionRoutes.post("/create", createElection);
ElectionRoutes.get("/all-elections", getAllElections);
ElectionRoutes.get("/active-elections", getActiveElections);
ElectionRoutes.get("/cancelled", getCancelledElections);
ElectionRoutes.get("/completed", getCompletedElections);
ElectionRoutes.get("/:id", getElectionById);

ElectionRoutes.put("/:id", updateElection);

ElectionRoutes.delete("/:id", deactivateElection);

module.exports = ElectionRoutes;
