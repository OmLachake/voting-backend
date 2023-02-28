const jwt = require("jsonwebtoken");
const { customAlphabet } = require("nanoid");
const User = require("../models/UserSchema");
const Voter = require("../models/VoterSchema");
const Election = require("../models/ElectionSchema");
const Candidate = require("../models/CandidateSchema");
const Location = require("../models/LocationSchema");

exports.SignUp = (req, res) => {
  User.find({ email: req.body.email }).exec((error, user) => {
    console.log(user);
    if (user.length !== 0) {
      return res.status(401).json({ message: "Email Already Exists" });
    }
    if (error) {
      return res.status(500).json({ message: "Something Went Wrong." });
    } else {
      const newUser = new User(req.body);
      const loginId = customAlphabet(newUser.name.replace(/ /g, ""), 5);
      newUser.loginId = loginId().toLowerCase();
      newUser.save((err, user) => {
        if (err) {
          return res.status(500).send(err);
        }
        const token = jwt.sign(
          {
            id: user._id,
            name: user.name,
            role: user.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );

        return res.status(200).json({ user: user, token });
      });
    }
  });
};

exports.Login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.comparePassword(req.body.password, (error, isMatch) => {
      if (error) {
        return res.status(500).send(error);
      }
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      console.log({ name: user.name, role: user.role, token });
      return res.status(200).json({ name: user.name, role: user.role, token });
    });
  });
};

exports.Logout = (req, res) => {
  User.findById(req.body.user.id, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Successfully logged out" });
  });
};

