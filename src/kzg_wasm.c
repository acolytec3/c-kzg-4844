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


char *byte_to_hex(unsigned char byte) {
    static char hex_string[3];
    sprintf(hex_string, "%02x", byte);
    return hex_string;
}

char *byte_string_to_hex(const unsigned char *byte_string, size_t length, char *hex_string) {
    for (size_t i = 0; i < length; i++) {
        strcat(hex_string, byte_to_hex(byte_string[i]));
    }
    return hex_string;
}

char* blob_to_kzg_commitment_wasm(const Blob *blob) {
    KZGCommitment *commit = malloc(sizeof(KZGCommitment));
    blob_to_kzg_commitment(commit, blob, s);
    char * hex = "";
    hex = byte_string_to_hex(commit->bytes, 48, hex);
    return hex;
};

