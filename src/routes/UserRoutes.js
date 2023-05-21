const express = require("express");
const { SignUp, Login, Logout } = require("../controllers/UserController");
const { verifyLogin } = require("../utils/validations");
const {
  getCandidateWallets,
  validateVote,
} = require("../controllers/VoterController");
const UserRoutes = express.Router();

UserRoutes.post("/signup", SignUp);
UserRoutes.post("/login", Login);
UserRoutes.post("/logout", verifyLogin, Logout);
UserRoutes.get("/candidate-wallets", getCandidateWallets);
UserRoutes.post("/validate-vote", validateVote);



module.exports = UserRoutes;
