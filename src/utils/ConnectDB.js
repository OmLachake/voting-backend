const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
const databaseURL = process.env.DB_LINK;

const localDB = `mongodb://localhost:27017/VITdb`;
const ConnectToDB = async () => {
  try {
    await mongoose.connect(databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected!");
  } catch (error) {
    console.error("Database Connection Failed: \n", error);
  }
};

module.exports = { ConnectToDB };
