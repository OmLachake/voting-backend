const { exec } = require("child_process");
const ExecutePeerCommand = async (command) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      return;
    }

    console.log("Peer Chaincode Invoked Succesfully");
    console.log("stdout:", stdout);
    console.error("stderr:", stderr);
  });
};

const CreateCandidateStateCommand = (candidateName) => {
  return `peer chaincode invoke -C airlinechannel -n vote1 -c '{"Args":["create","${candidateName}"]}' -o $ORDERER_ADDRESS --waitForEvent`;
};

const QueryCandidateStateCommand = (candidateName) => {
  return `peer chaincode invoke -C airlinechannel -n vote1 -c '{"Args":["query","${candidateName}"]}' -o $ORDERER_ADDRESS --waitForEvent`;
};

const InvokeCommand = (candidateName, Signature) => {
  return `peer chaincode invoke -C airlinechannel -n vote1 -c '{"Args":["invoke","${candidateName}","${Signature}"]}' -o $ORDERER_ADDRESS --waitForEvent`;
};

module.exports = {
  ExecutePeerCommand,
  CreateCandidateStateCommand,
  QueryCandidateStateCommand,
  InvokeCommand,
};
