const { v4: uuidv4 } = require("uuid");
// const crypto = require("ring-crypto").Crypto;
// const RingSignature = async (candidate) => {
//   const ringSize = 20;
//   const ring = [];
//   for (let i = 0; i < ringSize - 1; i++) {
//     const keyPair = await crypto.Sign.keyPair();
//     ring.push(keyPair.s_public_key);
//   }
//   const secretKeyPair = await crypto.Sign.keyPair();
//   ring.push(secretKeyPair.s_public_key);

//   const message = Buffer.from(candidate);
//   const ringSignature = await crypto.Ring.sign(message, secretKeyPair, ring);
//   console.log(
//     "Generated Signature for Candidate : ",
//     candidate,
//     " -->\n",
//     Buffer.from(ringSig.r_signature)
//   );
//   return {
//     ring,
//     ringSignature,
//   };
// };

// const ValidateRingSignature = async (candidate, ring, ringSignature) => {
//   const message = Buffer.from(candidate);
//   return await crypto.Ring.verify(message, ring, ringSignature);
// };

const GenerateTransactionKey = () => {
  const uuid = uuidv4();
  const randomNumber = parseInt(uuid.substr(0, 6), 16) % 1000000;
  return randomNumber.toString().padStart(6, "0");
};
module.exports = {
  // ValidateRingSignature,
  // RingSignature,
  GenerateTransactionKey,
};
