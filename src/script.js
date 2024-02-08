const { randomBytes } = require('crypto')
const kzg = require('./kzg')
const fs = require('fs')

const MAX_TOP_BYTE = 114;
const BYTES_PER_FIELD_ELEMENT = 4096
const FIELD_ELEMENTS_PER_BLOB = 32
const BYTES_PER_BLOB = BYTES_PER_FIELD_ELEMENT * FIELD_ELEMENTS_PER_BLOB
const trustedSetupPath = './trusted_setup.json'
// const trustedSetupPath = './trusted_setup.txt'
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
   // FS.readFile('trusted_setup.txt')
    const fileData = JSON.parse(fs.readFileSync(trustedSetupPath, { encoding: 'utf-8'}))
    const g1 = bytesFromHex(fileData.g1)
    const g2 = bytesFromHex(fileData.g2)
    const loadTrustedSetup = module.cwrap('load_trusted_setup_file_from_wasm', null,[] )
    const ret = loadTrustedSetup()
    //const fileData = fs.readFileSync(trustedSetupPath, { encoding: 'utf8'})
    console.log(ret)
    const blob = generateRandomBlob()
  //  const commitment = module._blob_to_kzg_commitment(blob)
  //  console.log(commitment)
})