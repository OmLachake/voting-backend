const Voter = require("../models/VoterSchema");

//TODO: Create a voter wallet and set the public address set tokens to 0.
exports.createVoter = (req, res) => {
  const newVoter = new Voter(req.body);
  newVoter.createdBy = req.body.user.id;
  newVoter.updatedBy = req.body.user.id;
  console.log(newVoter);
  newVoter.save((err, voter) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.status(201).json(voter);
  });
};

exports.getAllVoters = (req, res) => {
  Voter.find({ select: "-password" })
    .populate("locationId", "name _id")
    .populate({ path: "elections", select: "name _id ", model: "Election" })
    .exec((err, voters) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).json(voters);
    });
};

exports.getVoterById = (req, res) => {
  Voter.findById(req.params.id)
    .populate("locationId")
    .populate({
      path: "elections",
      select: "name _id status active",
      model: "Election",
    })
    .exec((err, voter) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!voter) {
        return res.status(404).json({ message: "Voter not found" });
      }
      return res.status(200).json(voter);
    });
};

exports.addElectionToVoter = (req, res) => {
  Voter.findByIdAndUpdate(
    req.params.id,
    {
      $push: { elections: req.body.electionID },
      $set: { updatedBy: req.body.user._id },
    },
    { new: true },
    (err, voter) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!voter) {
        return res.status(404).json({ message: "Voter not found" });
      }
      return res
        .status(200)
        .json({ message: "Voter added to Election successfully" });
    }
  );
};

//TODO : Allot Coin to the voter wallet
//TODO : Assign a organization
//TODO : Execute the Smart Contract to store the credentials on the network.
//TODO : Create a Peer Node in the network.
exports.verifyVoter = (req, res) => {
  Voter.findByIdAndUpdate(
    req.params.id,
    { $set: { isVerified: true, updatedBy: req.body.user._id } },
    { new: true },
    (err, voter) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!voter) {
        return res.status(404).json({ message: "Voter not found" });
      }
      return res.status(200).json({ message: "Voter Verified Sucessfully." });
    }
  );
};

exports.updateVoter = (req, res) => {
  Voter.findByIdAndUpdate(
    req.params.id,
    { ...req.body, $set: { updatedBy: req.body.user.id } },
    { new: true },
    (err, voter) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!voter) {
        return res.status(404).json({ message: "Voter not found" });
      }
      return res.status(200).json(voter);
    }
  );
};

//TODO : Remove the Peer Node
exports.deleteVoter = (req, res) => {
  Voter.findByIdAndRemove(req.params.id, (err, voter) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!voter) {
      return res.status(404).json({ message: "Voter not found" });
    }
    return res.status(200).json({ message: "Voter successfully deleted" });
  });
};

exports.Login = (req, res) => {
  Voter.findOne({ loginId: req.body.loginId })
    .populate()
    .exec((err, voter) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!user) {
        return res.status(404).json({ message: "Voter not found" });
      }

      voter.comparePassword(req.body.password, (error, isMatch) => {
        if (error) {
          return res.status(500).send(error);
        }
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
          {
            id: voter._id,
            isVoter: true,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );

        return res.status(200).json({ user: voter.name, token });
      });
    });
};

exports.Logout = (req, res) => {
  const { id } = jwt.decode(req.headers.authorization);

  Voter.findById(id, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Successfully logged out" });
  });
};
