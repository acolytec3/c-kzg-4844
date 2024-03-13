#include "kzg_wasm.h"
#include <inttypes.h>
#include <stdlib.h>
#include <string.h>

void btox(char *xp, const char *bb, int n) 
// Bytes To hex string conversion shamelessly borrowed from here: https://stackoverflow.com/a/53966346
{
    int size = n;
    const char xx[]= "0123456789ABCDEF";
    while (--n >= 0) xp[n] = xx[(bb[n>>1] >> ((1 - (n&1)) << 2)) & 0xF];
    xp[size] = 0;
}

uint8_t * xtob(char *hex, uint8_t * out, int size)
{
    uint8_t bytes[size / 2];
    int x = 0;
    int y = 0;
    char * ptr = hex;
    while (x < size) {
       char byte[3];
       memcpy(byte, ptr, 2);
       byte[2] = 0;
       char * temp;
       bytes[y] = strtol(byte, &temp, 16);
       x = x + 2;
       y++;
       ptr = ptr + 2;
    }
    memcpy(out, bytes, size / 2);
    return out;
}
KZGSettings *s;

C_KZG_RET load_trusted_setup_file_from_wasm() {
    FILE *file = fopen("trusted_setup.txt", "r");
    s = malloc(sizeof(KZGSettings));
    s->max_width = 0;
    s->roots_of_unity = NULL;
    s->g1_values = NULL;
    s->g2_values = NULL;
    return load_trusted_setup_file(s,file);
}

C_KZG_RET load_trusted_setup_from_wasm(char * g1,
    size_t n1,
    char * g2,
    size_t n2
    ) {
    s = malloc(sizeof(KZGSettings));
    s->max_width = 0;
    s->roots_of_unity = NULL;
    s->g1_values = NULL;
    s->g2_values = NULL;
    uint8_t * g1_bytes = malloc((strlen(g1) / 2));
    uint8_t * g2_bytes = malloc((strlen(g2) / 2));
    xtob(g1, g1_bytes, strlen(g1));
    xtob(g2, g2_bytes, strlen(g2));
    C_KZG_RET ok = load_trusted_setup(s, g1_bytes, n1, g2_bytes, n2);
    return ok;
}

void free_trusted_setup_wasm() {
    free_trusted_setup(s);
};

char* blob_to_kzg_commitment_wasm(const Blob *blob) {
    KZGCommitment *commit = malloc(sizeof(KZGCommitment));
    blob_to_kzg_commitment(commit, blob, s);
    int size = sizeof commit->bytes << 1;
    char * hex = malloc(size+1);
    btox(hex, (const char *)commit->bytes, size);
    return hex;
};

char* compute_blob_kzg_proof_wasm(
    const Blob *blob,
    const Bytes48 *commitment_bytes
) {
    KZGProof* proof = malloc(sizeof(KZGProof));
    compute_blob_kzg_proof(proof, blob, commitment_bytes, s);
    int size = sizeof proof->bytes << 1;
    char * hex = malloc(size+1);
    btox(hex, (const char *)proof->bytes, size);
    return hex;
};

char * verify_blob_kzg_proof_wasm(
    const Blob *blob,
    const Bytes48 *commitment_bytes,
    const Bytes48 *proof_bytes
) {
    bool ok = true;
    C_KZG_RET ret = verify_blob_kzg_proof(&ok, blob, commitment_bytes, proof_bytes, s);
    if (ret != 0) {
        switch (ret) 
        {
            case C_KZG_BADARGS: return "invalid input";
            break;
            case C_KZG_MALLOC: return "unable to allocate memory";
            break;
            default: return "internal error";
        };
    } else {
        if (ok == 1) {
            return "true";
        }
    }
    return "false";
};

char * verify_kzg_proof_wasm(
    const Bytes48 *commitment_bytes,
    const Bytes32 *z_bytes,
    const Bytes32 *y_bytes,
    const Bytes48 *proof_bytes) {

    bool ok = true;
    C_KZG_RET ret = verify_kzg_proof(&ok, commitment_bytes, z_bytes, y_bytes, proof_bytes, s);
    if (ret != 0) {
        switch (ret) 
        {
            case C_KZG_BADARGS: return "invalid input";
            break;
            case C_KZG_MALLOC: return "unable to allocate memory";
            break;
            default: return "internal error";
        };
    } else {
        if (ok == 1) {
            return "true";
        }
    }
    return "false";
    
    };
