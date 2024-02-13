#include "kzg_wasm.h"
#include <inttypes.h>
#include <stdlib.h>
#include <string.h>

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

void btox(char *xp, const char *bb, int n) 
{
    int size = n;
    const char xx[]= "0123456789ABCDEF";
    while (--n >= 0) xp[n] = xx[(bb[n>>1] >> ((1 - (n&1)) << 2)) & 0xF];
    xp[size] = 0;
}

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