const { randomBytes } = require('crypto')
const kzg = require('./kzg')
const fs = require('fs')

const MAX_TOP_BYTE = 114;
const BYTES_PER_FIELD_ELEMENT = 4096
const FIELD_ELEMENTS_PER_BLOB = 32
const BYTES_PER_BLOB = BYTES_PER_FIELD_ELEMENT * FIELD_ELEMENTS_PER_BLOB

function generateRandomBlob() {
    return new Uint8Array(
      randomBytes(BYTES_PER_BLOB).map((x, i) => {
        // Set the top byte to be low enough that the field element doesn't overflow the BLS modulus
        if (x > MAX_TOP_BYTE && i % BYTES_PER_FIELD_ELEMENT == 0) {
          return Math.floor(Math.random() * MAX_TOP_BYTE);
        }
        return x;
      })
    );
  }


  function bytesFromHex(hexString) {
    if (hexString.startsWith("0x")) {
      hexString = hexString.slice(2);
    }
    return Uint8Array.from(Buffer.from(hexString, "hex"));
  }
  
kzg().then(module => {

    const loadTrustedSetup = module.cwrap('load_trusted_setup_file_from_wasm', null,[] )
    const freeTrustedSetup = module.cwrap('free_trusted_setup_wasm', null,[] )
    const blobToKzgCommit = module.cwrap('blob_to_kzg_commitment_wasm', 'string',['array'] )
    const computeBlobKzgProof = module.cwrap('compute_blob_kzg_proof_wasm', 'string',['array', 'array'] )
    const verifyBlobKzgProof = module.cwrap('verify_blob_kzg_proof_wasm', 'number', ['array', 'array', 'array'])
    const verifyKzgProof = module.cwrap('verify_kzg_proof_wasm', 'number', ['array', 'array', 'array','array'])
    loadTrustedSetup()
    const blob = new Uint8Array(BYTES_PER_BLOB)
    blob[0] = 0x01
    blob[1] = 0x02
    const commitment = blobToKzgCommit(blob)
    console.log(commitment)
    const proof = computeBlobKzgProof(blob, Uint8Array.from(Buffer.from(commitment, 'hex')));
    console.log(proof)
    
    const verifiedBlobProof = verifyBlobKzgProof(blob,Uint8Array.from(Buffer.from(commitment, 'hex')), Uint8Array.from(Buffer.from(proof, 'hex')) )
    console.log('Verified blob proof -', verifiedBlobProof === 0)
    const precompileData = {
      Proof: bytesFromHex(
        '0x8ad6f539bc7280de6af4c95e7cef39bb6873f18c46ee5eb67299324ee7c6e6da71be2dbd5e2cbafbae4b2d60b40a808c'
      ),
      Commitment: bytesFromHex(
        '0xabb6bcbe313530ce7779abdf633d5a3594a41fbad9a79f4a9b46b89c0cfe78f6a15948dec92c4404aedac8b5e7dd6059'
      ),
      z: bytesFromHex(
        '0x0000000000000000000000000000000000000000000000000000000000002001'
      ),
      y: bytesFromHex(
        '0x0f69060fb771fa559a9e842e1dd79dde8a107486e801707032d93b5965d0cd48'
      ),
    }

    const verifiedKzgProof = verifyKzgProof(precompileData.Commitment, precompileData.z, precompileData.y, precompileData.Proof)
    console.log("Verified kzg proof from points - ", verifiedKzgProof === 0)
    freeTrustedSetup();
})