const secp = require("ethereum-cryptography/secp256k1");
const {keccak256} = require('ethereum-cryptography/keccak');
const {toHex,utf8ToBytes} = require("ethereum-cryptography/utils");
const privateKey = secp.secp256k1.utils.randomPrivateKey();
const publicKey = secp.secp256k1.getPublicKey(privateKey)
console.log("Priv:",toHex(privateKey));
console.log("PublicKey:",toHex(publicKey));
//Eth address is the last 20 bytes of the keccachash of the public key
// Ethereum address is the last 20 bytes of the Keccak hash of the public key
const publicKeyBytes = Buffer.from(publicKey, 'hex');
const keccakHash = keccak256(publicKeyBytes);
const ethAddress = "0x" + keccakHash.slice(-40);

console.log("Ethereum Address:", ethAddress);