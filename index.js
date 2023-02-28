const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const bodyParser = require("body-parser");
const { ConnectToDB } = require("./src/utils/ConnectDB");
const AdminRoutes = require("./src/routes/admin");
const ModeratorRoutes = require("./src/routes/moderator");
const VoterRoutes = require("./src/routes/voter");
const UserRoutes = require("./src/routes/UserRoutes");
const { verifyLogin } = require("./src/utils/validations");

env.config();
const app = express();
app.use(cors());
app.use(bodyParser());
ConnectToDB();

app.use("/api", UserRoutes);
app.use("/api", VoterRoutes);
app.use("/api", verifyLogin, ModeratorRoutes);
app.use("/api", verifyLogin, AdminRoutes);

app.listen(process.env.PORT, (req, res) => {
  console.log("Server Connected : ", process.env.PORT);
});


// function print(path, layer) {
//   if (layer.route) {
//     layer.route.stack.forEach(
//       print.bind(null, path.concat(split(layer.route.path)))
//     );
//   } else if (layer.name === "router" && layer.handle.stack) {
//     layer.handle.stack.forEach(
//       print.bind(null, path.concat(split(layer.regexp)))
//     );
//   } else if (layer.method) {
//     console.log(
//       "%s /%s",
//       layer.method.toUpperCase(),
//       path.concat(split(layer.regexp)).filter(Boolean).join("/")
//     );
//   }
// }

// function split(thing) {
//   if (typeof thing === "string") {
//     return thing.split("/");
//   } else if (thing.fast_slash) {
//     return "";
//   } else {
//     var match = thing
//       .toString()
//       .replace("\\/?", "")
//       .replace("(?=\\/|$)", "$")
//       .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
//     return match
//       ? match[1].replace(/\\(.)/g, "$1").split("/")
//       : "<complex:" + thing.toString() + ">";
//   }
// }

// app._router.stack.forEach(print.bind(null, []));
