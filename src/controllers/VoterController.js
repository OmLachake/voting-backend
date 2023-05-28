const Voter = require("../models/VoterSchema");
const jwt = require("jsonwebtoken");
const Wallet = require("../models/WalletSchema");
const Transaction = require("../models/TransacationSchema");
const { generateKeyPair } = require("crypto");
const Candidate = require("../models/CandidateSchema");
const {
  // RingSignature,
  GenerateTransactionKey,
  // ValidateRingSignature,
} = require("../../hyperledger/functions");
const crypto = require("crypto");
const { InvokeCommand, ExecutePeerCommand } = require("../../hyperledger");

//TODO: Create a voter wallet and set the public address set tokens to 0.
exports.createVoter = (req, res) => {
  const newVoter = new Voter(req.body);
  let keyPair = {
    public: "",
    private: "",
  };
  generateKeyPair(
    "ec",
    {
      namedCurve: "secp256k1", // Options
      publicKeyEncoding: {
        type: "spki",
        format: "der",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "der",
      },
    },
    (err, publicKey, privateKey) => {
      if (!err) {
        keyPair.public = publicKey.toString("hex");
        keyPair.private = privateKey.toString("hex");

        const newWallet = new Wallet({
          private: keyPair.private,
          public: keyPair.public,
        });
        newWallet.save((err, wallet) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
          newVoter.createdBy = req.body.user.id;
          newVoter.updatedBy = req.body.user.id;
          newVoter.WalletID = wallet._id;
          newVoter.save((err, voter) => {
            if (err) {
              console.log(err);
              return res.status(500).send(err);
            }
            return res.status(201).json(voter);
          });
        });
      } else {
        console.log("Error Generating Keys: ", err);
      }
    }
  );
};

exports.getAllVoters = (req, res) => {
  Voter.find({ select: "-password" })
    .populate("locationId", "name _id")
    .populate({
      path: "elections.electionId",
      select: "name _id ",
      model: "Election",
    })
    .exec((err, voters) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).json(voters);
    });
};

exports.getVoterById = (req, res) => {
  Voter.findById(req.body.user.id)
    .populate("locationId")
    .populate({
      path: "elections.electionId",
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

const getWalletKeysForSignature = async () => {
  const data = Wallet.find({ select: "public" });
  return data;
};

exports.getVoterWallet = (req, res) => {
  Voter.findById(req.body.user.id).exec((err, voter) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!voter) {
      return res.status(404).json({ message: "Voter not found" });
    }
    Wallet.findById(voter.WalletID).exec((err, wallet) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!voter) {
        return res.status(404).json({ message: "Wallet not found" });
      }
      return res.status(200).send({
        wallet: {
          public_key: wallet.public,
          tokens: wallet.voteToken,
        },
      });
    });
  });
};

exports.getCandidateWallets = (req, res) => {
  Candidate.find()
    .populate("WalletID locationId")
    .exec((err, candidates) => {
      const W = [];
      candidates.forEach((item, i) => {
        const candidate = {
          name: item.name,
          public_key: item.WalletID.public,
          tokens: item.WalletID.voteToken,
        };
        W.push(candidate);
      });
      return res.status(200).json({ wallets: W });
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

      Wallet.findOneAndUpdate(
        { _id: voter.WalletID },
        { $set: { voteToken: voter.elections.length } },
        { new: true }
      ).exec((err, wallet) => {
        if (err) {
          return res.status(500).send(err);
        }
        if (!wallet) {
          return res.status(404).json({ message: "Voter not found" });
        }

        console.info(
          `${wallet.voteToken} Vote Tokens Transferred to ${voter.name}`
        );
        return res.status(200).json({ message: "Voter Verified Sucessfully." });
      });
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
  Voter.findOne({ loginId: req.body.email, isVerified: true })
    .populate()
    .exec((err, voter) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!voter) {
        return res.status(404).json({ message: "Voter not found" });
      }

      if (voter.password === req.body.password) {
        const token = jwt.sign(
          {
            id: voter._id,
            isVoter: true,
            name: voter.name,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );
        return res.status(200).json({
          user: {
            name: voter.name,
            id: voter._id,
            email: voter.email,
            locationId: voter.locationId,
          },
          token,
        });
      }
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

exports.castVote = async (req, res) => {
  const { candidateId, electionId } = req.body;

  Voter.findOne({ _id: req.body.user.id }).exec((err, voter) => {
    if (err || !voter) {
      return res
        .send(400)
        .json({ message: "Something went wrong.", error: err });
    }

    Wallet.findOne({ _id: voter.WalletID }).exec((err, voterWallet) => {
      if (err) {
        return res.send(400).json({
          message: "Something went wrong.",
          error: err,
        });
      }
      if (voterWallet.voteToken === 0) {
        return res
          .status(400)
          .json({ message: "Voting Failed. You Have no Tokens" });
      }
      Wallet.findOneAndUpdate(
        { _id: voter.WalletID },
        { $set: { voteToken: voterWallet.voteToken - 1 } },
        { new: true }
      ).exec((err, updateVoterWallet) => {
        if (err) {
          return res.status(500).send(err);
        }
        if (!updateVoterWallet) {
          return res.status(404).json({ message: "Voter not found" });
        }
      });

      Candidate.findById(candidateId).exec((err, candidate) => {
        if (err || !candidate) {
          return res.send(400).json({ message: "Something went wrong." });
        }

        Wallet.findOne(candidate.WalletID).exec((err, candidateWallet) => {
          if (err) {
            return res.status(500).send(err);
          }
          if (!candidateWallet) {
            return res.status(404).json({ message: "Voter not found" });
          }

          Wallet.findOneAndUpdate(
            { _id: candidate.WalletID },
            { $set: { voteToken: candidateWallet.voteToken + 1 } },
            { new: true }
          ).exec(async (err, updatedCandidateWallet) => {
            if (err) {
              return res.status(500).send(err);
            }
            if (!updatedCandidateWallet) {
              return res.status(404).json({ message: "Failed" });
            }
            // const { ring, ringSignature } = await RingSignature(candidate.name);
            const hash = crypto.createHash("sha256");
            hash.update(voterWallet.private);
            const VoterHash = hash.digest("hex");
            const TransactionKey = GenerateTransactionKey();
            const newTransaction = new Transaction({
              VoterHash,
              RingData: { candidate: candidate.name },
              TransactionKey,
            });
            newTransaction.save(async (err, transaction) => {
              if (err) {
                return res.status(500).send(err);
              }
              if (!transaction) {
                return res.status(404).json({ message: "Voter not found" });
              }
              const command = InvokeCommand(candidate.loginId, VoterHash);
              await ExecutePeerCommand(command);
              return res.status(200).json({
                message: "Voting Succesful",
                TransactionKey: TransactionKey,
                SignatureGenerated: VoterHash,
              });
            });
          });
        });
      });
    });
  });
};

exports.validateVote = async (req, res) => {
  const TransactionKey = req.body.TransactionKey;
  Transaction.findOne({ TransactionKey: TransactionKey }).exec(
    async (err, transaction) => {
      if (err) {
        console.log("Something Went wrong");
        return res.status(500).json({ message: "Something Went Wrong" });
      }
      if (!transaction) {
        console.log("Transaction Not Found");
        return res.status(404).json({ message: "Invalid Vote", valid: false });
      }

      // const Valid = ValidateRingSignature(
      //   transaction.RingData.candidate,
      //   transaction.RingData.ring,
      //   transaction.RingData.ringSignature
      // );

      return res.status(200).json({
        message: "Vote Validated",
        valid: true,
      });
    }
  );
};