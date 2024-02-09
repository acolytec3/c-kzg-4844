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

char* blob_to_kzg_commitment_wasm(const Blob *blob) {
    KZGCommitment *commit = malloc(sizeof(KZGCommitment));
    int ret = blob_to_kzg_commitment(commit, blob, s);
    printf("Blob converted - %u\n", ret);
    int i = 0;
    int j = 0;
    for(j=i;j<48;j++) {
        printf("%u", blob->bytes[j]);
    };
    printf("\n");
    // int n = 48;
    // char * xp = malloc(sizeof(n));
    // const char xx[]= "0123456789ABCDEF";
    // while (--n >= 0) xp[n] = xx[(commit->bytes[n>>1] >> ((1 - (n&1)) << 2)) & 0xF];
    // printf("%s \n", xp);
    return "hi";
};