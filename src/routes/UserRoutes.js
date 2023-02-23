const express = require("express");
const { SignUp, Login, Logout } = require("../controllers/UserController");
const { verifyLogin } = require("../utils/validations");
const UserRoutes = express.Router();

UserRoutes.post("/signup", SignUp);
UserRoutes.post("/login", Login);
UserRoutes.post("/logout", verifyLogin, Logout);

module.exports = UserRoutes;
