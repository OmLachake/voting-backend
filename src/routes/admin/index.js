const express = require("express");
const { isAdmin } = require("../../utils/validations");
const CandidateRoutes = require("./CandidateRoutes");
const ElectionRoutes = require("./ElectionRoutes");
const LocationRoutes = require("./LocationRoutes");
const AdminRoutes = express.Router();

AdminRoutes.use("/admin/election", isAdmin, ElectionRoutes);
AdminRoutes.use("/admin/candidate", isAdmin, CandidateRoutes);
AdminRoutes.use("/admin/location", isAdmin, LocationRoutes);

module.exports = AdminRoutes;