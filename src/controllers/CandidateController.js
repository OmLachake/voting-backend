const Candidate = require("../models/CandidateSchema");

//TODO: Create a peer node
//TODO: Assign a organization
//TODO: Create wallet and set the public address and set tokens to 0.
exports.createCandidate = (req, res) => {
  const newCandidate = new Candidate(req.body);
  newCandidate.createdBy = req.body.user.id;
  newCandidate.updatedBy = req.body.user.id;
  newCandidate.save((err, candidate) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(201).json(candidate);
  });
};

exports.getAllCandidates = (req, res) => {
  const filters = req.body.filters;
  Candidate.find({ ...filters })
    .populate("locationId", "name zip")
    .populate("electionId", "name zip")
    .populate("updatedBy", "name -_id")
    .exec((err, candidates) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).json(candidates);
    });
};

exports.getCandidateById = (req, res) => {
  Candidate.findById(req.params.id)
    .populate({
      path: "electionId",
      model: "Election",
      select: "name _id",
    })
    .populate({
      path: "locationId",
      model: "Location",
      select: "name zip _id",
    })
    .populate({
      path: "WalletID",
      model: "Wallet",
      select: "public_key",
    })
    .exec((err, candidate) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!candidate) {
        return res.status(404).json({ message: "Candidate not found" });
      }
      return res.status(200).json(candidate);
    });
};

exports.updateCandidate = (req, res) => {
  Candidate.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    upsert: true,
  })
    .populate({
      path: "electionId",
      model: "Election",
      select: "name _id",
    })
    .populate({
      path: "locationId",
      model: "Location",
      select: "name _id",
    })
    .populate({
      path: "WalletID",
      model: "Wallet",
      select: "public_key",
    })
    .exec((err, candidate) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!candidate) {
        return res.status(404).json({ message: "Candidate not found" });
      }
      return res.status(200).json(candidate);
    });
};

//TODO : Disable the Peer Node in the network
exports.deactivateCandidate = (req, res) => {
  Candidate.findById(req.params.id).exec((err, candidate) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    candidate.active = false;
    candidate.save((error) => {
      if (error) {
        return res.status(500).send(error);
      }
      return res.status(200).json(candidate);
    });
  });
};

//TODO : Remove the Peer node in the network
exports.deleteCandidate = (req, res) => {
  Candidate.findByIdAndRemove(req.params.id, (err, candidate) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    return res.status(200).json({ message: "Candidate deleted successfully" });
  });
};
