const express = require("express");
const CandidateRoutes = express.Router();
const {
  getCandidateById,
  getAllCandidates,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  deactivateCandidate,
} = require("../../controllers/CandidateController");

CandidateRoutes.post("/", createCandidate);
CandidateRoutes.get("/all-candidates", getAllCandidates);
CandidateRoutes.get("/:id", getCandidateById);
CandidateRoutes.put("/:id", updateCandidate);
CandidateRoutes.delete("/deactivate/:id", deactivateCandidate);
CandidateRoutes.delete("/:id", deleteCandidate);


module.exports = CandidateRoutes;
