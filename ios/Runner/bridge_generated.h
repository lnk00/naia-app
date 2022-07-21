#include <stdbool.h>
#include <stdint.h>
#include <stdlib.h>

typedef struct wire_uint_8_list {
  uint8_t *ptr;
  int32_t len;
} wire_uint_8_list;

typedef struct wire_Environment {
  struct wire_uint_8_list *auth0_client_secret;
  struct wire_uint_8_list *auth0_client_id;
  struct wire_uint_8_list *auth0_authorize_url;
  struct wire_uint_8_list *auth0_token_url;
  struct wire_uint_8_list *auth0_redirect_url;
} wire_Environment;

typedef struct WireSyncReturnStruct {
  uint8_t *ptr;
  int32_t len;
  bool success;
} WireSyncReturnStruct;

typedef int64_t DartPort;

typedef bool (*DartPostCObjectFnType)(DartPort port_id, void *message);

void wire_ping(int64_t port_);

void wire_get_auth_url(int64_t port_, struct wire_Environment *env);

void wire_get_token(int64_t port_,
                    struct wire_uint_8_list *pkce_verifier,
                    struct wire_uint_8_list *auth_code,
                    struct wire_Environment *env);

struct wire_Environment *new_box_autoadd_environment_0(void);

struct wire_uint_8_list *new_uint_8_list_0(int32_t len);

void free_WireSyncReturnStruct(struct WireSyncReturnStruct val);

void store_dart_post_cobject(DartPostCObjectFnType ptr);

static int64_t dummy_method_to_enforce_bundling(void) {
    int64_t dummy_var = 0;
    dummy_var ^= ((int64_t) (void*) wire_ping);
    dummy_var ^= ((int64_t) (void*) wire_get_auth_url);
    dummy_var ^= ((int64_t) (void*) wire_get_token);
    dummy_var ^= ((int64_t) (void*) new_box_autoadd_environment_0);
    dummy_var ^= ((int64_t) (void*) new_uint_8_list_0);
    dummy_var ^= ((int64_t) (void*) free_WireSyncReturnStruct);
    dummy_var ^= ((int64_t) (void*) store_dart_post_cobject);
    return dummy_var;
}