const express = require("express");
const CandidateRoutes = require("./CandidateRoutes");
const ElectionRoutes = require("./ElectionRoutes");
const LocationRoutes = require("./LocationRoutes");
const AdminRoutes = express.Router();

AdminRoutes.add("/admin/election", isAdmin, ElectionRoutes);
AdminRoutes.add("/admin/candidate", isAdmin, CandidateRoutes);
AdminRoutes.add("/admin/location", isAdmin, LocationRoutes);
