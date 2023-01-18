const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

exports.SignUp = (req, res) => {
  const newUser = new User(req.body);

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

    return res.status(201).json({ user: user.name, token });
  });
};

exports.Login = (req, res) => {
  User.findOne({ loginId: req.body.loginId }, (err, user) => {
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

      return res.status(200).json({ user: user.name, token });
    });
  });
};

exports.Logout = (req, res) => {
  const { id } = jwt.decode(req.headers.authorization);

  User.findById(id, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Successfully logged out" });
  });
};
