const express = require("express");
const { SignUp, Login, Logout } = require("../controllers/UserController");
const UserRoutes = express.Router();

UserRoutes.post("/signup", SignUp);
UserRoutes.post("/login", Login);
UserRoutes.post("/logout", Logout);

module.exports = UserRoutes;
