const Election = require("../models/ElectionSchema");

//TODO: Start a new Network
exports.createElection = (req, res) => {
  const newElection = new Election(req.body);
  newElection.createdBy = req.body.user.id;
  newElection.updatedBy = req.body.user.id;
  newElection.save((err, election) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(201).json(election);
  });
};

exports.getAllElections = (req, res) => {
  Election.find({})
    .populate({
      path: "locations.locationId",
      model: "Location",
      select: "name",
    })
    .exec((err, elections) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).json(elections);
    });
};

exports.getActiveElections = (req, res) => {
  Election.find({ active: true })
    .populate({
      path: "locations.locationId",
      model: "Location",
      select: "name",
    })
    .exec((err, activeElections) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).json(activeElections);
    });
};

exports.getCancelledElections = (req, res) => {
  Election.find({ status: "cancelled" })
    .populate({
      path: "locations.locationId",
      model: "Location",
      select: "name",
    })
    .exec((err, activeElections) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).json(activeElections);
    });
};

exports.getCompletedElections = (req, res) => {
  Election.find({ status: "completed" })
    .populate({
      path: "locations.locationId",
      model: "Location",
      select: "name",
    })
    .exec((err, activeElections) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).json(activeElections);
    });
};

exports.getElectionById = (req, res) => {
  Election.findById(req.params.id)
    .populate({
      path: "locations.locationId",
      model: "Location",
      select: "name zip -_id",
    })
    .populate("createdBy", "name -_id")
    .populate("updatedBy", "name -_id")
    .exec((err, election) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!election) {
        return res.status(404).json({ message: "Election not found" });
      }
      return res.status(200).json(election);
    });
};

exports.updateElection = (req, res) => {
  Election.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedBy: req.body.user.id },
    {
      new: true,
    }
  )
    .populate({
      path: "locations.locationId",
      model: "Location",
      select: "name zip -_id",
    })
    .populate("createdBy", "name -_id")
    .populate("updatedBy", "name -_id")
    .exec((err, election) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!election) {
        return res.status(404).json({ message: "Election not found" });
      }
      return res.status(200).json(election);
    });
};

//TODO : Shut down the fabric network
exports.deactivateElection = (req, res) => {
  Election.findById(req.params.id, (err, election) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!election) {
      return res.status(404).json({ message: "Election not found" });
    }

    if (req.body.status === "scheduled" || req.body.status === "active") {
      return res.status(500).json({ message: "Invalid Status Change" });
    }
    election.status = req.body.status;
    election.active = false;
    election.save((error) => {
      if (error) {
        return res.status(500).send(error);
      }
      return res.status(200).json(election);
    });
  });
};
