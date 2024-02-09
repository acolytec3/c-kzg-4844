#include "wasm.h"

C_KZG_RET load_trusted_setup_file_from_wasm() {
    FILE *file = fopen("trusted_setup.txt", "r");

    KZGSettings *s = malloc(sizeof(KZGSettings));

    s->max_width = 0;
    s->roots_of_unity = NULL;
    s->g1_values = NULL;
    s->g2_values = NULL;
    return load_trusted_setup_file(s,file);
}