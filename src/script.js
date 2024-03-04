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
    const verifyBlobKzgProof = module.cwrap('verify_blob_kzg_proof_wasm', 'string', ['array', 'array', 'array'])
    const verifyKzgProof = module.cwrap('verify_kzg_proof_wasm', 'string', ['array', 'array', 'array','array'])
    loadTrustedSetup()
    const blob = new Uint8Array(BYTES_PER_BLOB)
    blob[0] = 0x01
    blob[1] = 0x02
    const commitment = blobToKzgCommit(blob)
    console.log(commitment)
    const proof = computeBlobKzgProof(blob, Uint8Array.from(Buffer.from(commitment, 'hex')));
    console.log(proof)
    
    const verifiedBlobProof = verifyBlobKzgProof(blob,Uint8Array.from(Buffer.from(commitment, 'hex')), Uint8Array.from(Buffer.from(proof, 'hex')) )
    console.log('Verified blob proof -', verifiedBlobProof)
    const precompileData = {
      Proof: bytesFromHex(
        '0xc00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
      ),
      Commitment: bytesFromHex(
        '0xc00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
      ),
      z: bytesFromHex(
        '0x623ce31cf9759a5c8daf3a357992f9f3dd7f9339d8998bc8e68373e54f00b75e'
      ),
      y: bytesFromHex(
        '0x000000000000000000000000000000000000000000000000000000000000000'
      ),
    }

    const verifiedKzgProof = verifyKzgProof(precompileData.Commitment, precompileData.z, precompileData.y, precompileData.Proof)
    console.log("Verified kzg proof from points - ", verifiedKzgProof)
    freeTrustedSetup();
})