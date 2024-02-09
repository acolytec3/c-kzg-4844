/**
 * @file wasm.h
 *
 * Minimal interface required loading c-kzg in WASM .
 */
#ifndef WASM_H
#define WASM_H

#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include "c_kzg_4844.h"

#ifdef __cplusplus
extern "C" {
#endif

C_KZG_RET load_trusted_setup_file_from_wasm();

char* blob_to_kzg_commitment_wasm(const Blob *blob);
#ifdef __cplusplus
}
#endif

#endif /* WASM_H */