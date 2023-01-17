const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const bodyParser = require("body-parser");
const { ConnectToDB } = require("./src/utils/ConnectDB");

env.config();
const app = express();
app.use(cors());
app.use(bodyParser());
ConnectToDB();

app.listen(process.env.PORT, (req, res) => {
  console.log("Server Connected : ", process.env.PORT);
});
