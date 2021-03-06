// AUTO GENERATED FILE, DO NOT EDIT.
// Generated by `flutter_rust_bridge`.

// ignore_for_file: non_constant_identifier_names, unused_element, duplicate_ignore, directives_ordering, curly_braces_in_flow_control_structures, unnecessary_lambdas, slash_for_doc_comments, prefer_const_literals_to_create_immutables, implicit_dynamic_list_literal, duplicate_import, unused_import, prefer_single_quotes, prefer_const_constructors, use_super_parameters, always_use_package_imports

import 'dart:convert';
import 'dart:typed_data';

import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter_rust_bridge/flutter_rust_bridge.dart';
import 'dart:ffi' as ffi;

abstract class NaiaLib {
  Future<PingResponse> ping({dynamic hint});

  FlutterRustBridgeTaskConstMeta get kPingConstMeta;

  Future<AuthorizationUrl> getAuthUrl({required Environment env, dynamic hint});

  FlutterRustBridgeTaskConstMeta get kGetAuthUrlConstMeta;

  Future<String> getToken(
      {required String pkceVerifier,
      required String authCode,
      required Environment env,
      dynamic hint});

  FlutterRustBridgeTaskConstMeta get kGetTokenConstMeta;
}

class AuthorizationUrl {
  final String url;
  final String pkceVerifier;

  AuthorizationUrl({
    required this.url,
    required this.pkceVerifier,
  });
}

class Environment {
  final String auth0ClientSecret;
  final String auth0ClientId;
  final String auth0AuthorizeUrl;
  final String auth0TokenUrl;
  final String auth0RedirectUrl;

  Environment({
    required this.auth0ClientSecret,
    required this.auth0ClientId,
    required this.auth0AuthorizeUrl,
    required this.auth0TokenUrl,
    required this.auth0RedirectUrl,
  });
}

class PingResponse {
  final String version;
  final String name;
  final List<String> databases;

  PingResponse({
    required this.version,
    required this.name,
    required this.databases,
  });
}

class NaiaLibImpl extends FlutterRustBridgeBase<NaiaLibWire>
    implements NaiaLib {
  factory NaiaLibImpl(ffi.DynamicLibrary dylib) =>
      NaiaLibImpl.raw(NaiaLibWire(dylib));

  NaiaLibImpl.raw(NaiaLibWire inner) : super(inner);

  Future<PingResponse> ping({dynamic hint}) =>
      executeNormal(FlutterRustBridgeTask(
        callFfi: (port_) => inner.wire_ping(port_),
        parseSuccessData: _wire2api_ping_response,
        constMeta: kPingConstMeta,
        argValues: [],
        hint: hint,
      ));

  FlutterRustBridgeTaskConstMeta get kPingConstMeta =>
      const FlutterRustBridgeTaskConstMeta(
        debugName: "ping",
        argNames: [],
      );

  Future<AuthorizationUrl> getAuthUrl(
          {required Environment env, dynamic hint}) =>
      executeNormal(FlutterRustBridgeTask(
        callFfi: (port_) => inner.wire_get_auth_url(
            port_, _api2wire_box_autoadd_environment(env)),
        parseSuccessData: _wire2api_authorization_url,
        constMeta: kGetAuthUrlConstMeta,
        argValues: [env],
        hint: hint,
      ));

  FlutterRustBridgeTaskConstMeta get kGetAuthUrlConstMeta =>
      const FlutterRustBridgeTaskConstMeta(
        debugName: "get_auth_url",
        argNames: ["env"],
      );

  Future<String> getToken(
          {required String pkceVerifier,
          required String authCode,
          required Environment env,
          dynamic hint}) =>
      executeNormal(FlutterRustBridgeTask(
        callFfi: (port_) => inner.wire_get_token(
            port_,
            _api2wire_String(pkceVerifier),
            _api2wire_String(authCode),
            _api2wire_box_autoadd_environment(env)),
        parseSuccessData: _wire2api_String,
        constMeta: kGetTokenConstMeta,
        argValues: [pkceVerifier, authCode, env],
        hint: hint,
      ));

  FlutterRustBridgeTaskConstMeta get kGetTokenConstMeta =>
      const FlutterRustBridgeTaskConstMeta(
        debugName: "get_token",
        argNames: ["pkceVerifier", "authCode", "env"],
      );

  // Section: api2wire
  ffi.Pointer<wire_uint_8_list> _api2wire_String(String raw) {
    return _api2wire_uint_8_list(utf8.encoder.convert(raw));
  }

  ffi.Pointer<wire_Environment> _api2wire_box_autoadd_environment(
      Environment raw) {
    final ptr = inner.new_box_autoadd_environment_0();
    _api_fill_to_wire_environment(raw, ptr.ref);
    return ptr;
  }

  int _api2wire_u8(int raw) {
    return raw;
  }

  ffi.Pointer<wire_uint_8_list> _api2wire_uint_8_list(Uint8List raw) {
    final ans = inner.new_uint_8_list_0(raw.length);
    ans.ref.ptr.asTypedList(raw.length).setAll(0, raw);
    return ans;
  }

  // Section: api_fill_to_wire

  void _api_fill_to_wire_box_autoadd_environment(
      Environment apiObj, ffi.Pointer<wire_Environment> wireObj) {
    _api_fill_to_wire_environment(apiObj, wireObj.ref);
  }

  void _api_fill_to_wire_environment(
      Environment apiObj, wire_Environment wireObj) {
    wireObj.auth0_client_secret = _api2wire_String(apiObj.auth0ClientSecret);
    wireObj.auth0_client_id = _api2wire_String(apiObj.auth0ClientId);
    wireObj.auth0_authorize_url = _api2wire_String(apiObj.auth0AuthorizeUrl);
    wireObj.auth0_token_url = _api2wire_String(apiObj.auth0TokenUrl);
    wireObj.auth0_redirect_url = _api2wire_String(apiObj.auth0RedirectUrl);
  }
}

// Section: wire2api
String _wire2api_String(dynamic raw) {
  return raw as String;
}

List<String> _wire2api_StringList(dynamic raw) {
  return (raw as List<dynamic>).cast<String>();
}

AuthorizationUrl _wire2api_authorization_url(dynamic raw) {
  final arr = raw as List<dynamic>;
  if (arr.length != 2)
    throw Exception('unexpected arr length: expect 2 but see ${arr.length}');
  return AuthorizationUrl(
    url: _wire2api_String(arr[0]),
    pkceVerifier: _wire2api_String(arr[1]),
  );
}

PingResponse _wire2api_ping_response(dynamic raw) {
  final arr = raw as List<dynamic>;
  if (arr.length != 3)
    throw Exception('unexpected arr length: expect 3 but see ${arr.length}');
  return PingResponse(
    version: _wire2api_String(arr[0]),
    name: _wire2api_String(arr[1]),
    databases: _wire2api_StringList(arr[2]),
  );
}

int _wire2api_u8(dynamic raw) {
  return raw as int;
}

Uint8List _wire2api_uint_8_list(dynamic raw) {
  return raw as Uint8List;
}

// ignore_for_file: camel_case_types, non_constant_identifier_names, avoid_positional_boolean_parameters, annotate_overrides, constant_identifier_names

// AUTO GENERATED FILE, DO NOT EDIT.
//
// Generated by `package:ffigen`.

/// generated by flutter_rust_bridge
class NaiaLibWire implements FlutterRustBridgeWireBase {
  /// Holds the symbol lookup function.
  final ffi.Pointer<T> Function<T extends ffi.NativeType>(String symbolName)
      _lookup;

  /// The symbols are looked up in [dynamicLibrary].
  NaiaLibWire(ffi.DynamicLibrary dynamicLibrary)
      : _lookup = dynamicLibrary.lookup;

  /// The symbols are looked up with [lookup].
  NaiaLibWire.fromLookup(
      ffi.Pointer<T> Function<T extends ffi.NativeType>(String symbolName)
          lookup)
      : _lookup = lookup;

  void wire_ping(
    int port_,
  ) {
    return _wire_ping(
      port_,
    );
  }

  late final _wire_pingPtr =
      _lookup<ffi.NativeFunction<ffi.Void Function(ffi.Int64)>>('wire_ping');
  late final _wire_ping = _wire_pingPtr.asFunction<void Function(int)>();

  void wire_get_auth_url(
    int port_,
    ffi.Pointer<wire_Environment> env,
  ) {
    return _wire_get_auth_url(
      port_,
      env,
    );
  }

  late final _wire_get_auth_urlPtr = _lookup<
      ffi.NativeFunction<
          ffi.Void Function(
              ffi.Int64, ffi.Pointer<wire_Environment>)>>('wire_get_auth_url');
  late final _wire_get_auth_url = _wire_get_auth_urlPtr
      .asFunction<void Function(int, ffi.Pointer<wire_Environment>)>();

  void wire_get_token(
    int port_,
    ffi.Pointer<wire_uint_8_list> pkce_verifier,
    ffi.Pointer<wire_uint_8_list> auth_code,
    ffi.Pointer<wire_Environment> env,
  ) {
    return _wire_get_token(
      port_,
      pkce_verifier,
      auth_code,
      env,
    );
  }

  late final _wire_get_tokenPtr = _lookup<
      ffi.NativeFunction<
          ffi.Void Function(
              ffi.Int64,
              ffi.Pointer<wire_uint_8_list>,
              ffi.Pointer<wire_uint_8_list>,
              ffi.Pointer<wire_Environment>)>>('wire_get_token');
  late final _wire_get_token = _wire_get_tokenPtr.asFunction<
      void Function(int, ffi.Pointer<wire_uint_8_list>,
          ffi.Pointer<wire_uint_8_list>, ffi.Pointer<wire_Environment>)>();

  ffi.Pointer<wire_Environment> new_box_autoadd_environment_0() {
    return _new_box_autoadd_environment_0();
  }

  late final _new_box_autoadd_environment_0Ptr =
      _lookup<ffi.NativeFunction<ffi.Pointer<wire_Environment> Function()>>(
          'new_box_autoadd_environment_0');
  late final _new_box_autoadd_environment_0 = _new_box_autoadd_environment_0Ptr
      .asFunction<ffi.Pointer<wire_Environment> Function()>();

  ffi.Pointer<wire_uint_8_list> new_uint_8_list_0(
    int len,
  ) {
    return _new_uint_8_list_0(
      len,
    );
  }

  late final _new_uint_8_list_0Ptr = _lookup<
      ffi.NativeFunction<
          ffi.Pointer<wire_uint_8_list> Function(
              ffi.Int32)>>('new_uint_8_list_0');
  late final _new_uint_8_list_0 = _new_uint_8_list_0Ptr
      .asFunction<ffi.Pointer<wire_uint_8_list> Function(int)>();

  void free_WireSyncReturnStruct(
    WireSyncReturnStruct val,
  ) {
    return _free_WireSyncReturnStruct(
      val,
    );
  }

  late final _free_WireSyncReturnStructPtr =
      _lookup<ffi.NativeFunction<ffi.Void Function(WireSyncReturnStruct)>>(
          'free_WireSyncReturnStruct');
  late final _free_WireSyncReturnStruct = _free_WireSyncReturnStructPtr
      .asFunction<void Function(WireSyncReturnStruct)>();

  void store_dart_post_cobject(
    DartPostCObjectFnType ptr,
  ) {
    return _store_dart_post_cobject(
      ptr,
    );
  }

  late final _store_dart_post_cobjectPtr =
      _lookup<ffi.NativeFunction<ffi.Void Function(DartPostCObjectFnType)>>(
          'store_dart_post_cobject');
  late final _store_dart_post_cobject = _store_dart_post_cobjectPtr
      .asFunction<void Function(DartPostCObjectFnType)>();
}

class wire_uint_8_list extends ffi.Struct {
  external ffi.Pointer<ffi.Uint8> ptr;

  @ffi.Int32()
  external int len;
}

class wire_Environment extends ffi.Struct {
  external ffi.Pointer<wire_uint_8_list> auth0_client_secret;

  external ffi.Pointer<wire_uint_8_list> auth0_client_id;

  external ffi.Pointer<wire_uint_8_list> auth0_authorize_url;

  external ffi.Pointer<wire_uint_8_list> auth0_token_url;

  external ffi.Pointer<wire_uint_8_list> auth0_redirect_url;
}

typedef DartPostCObjectFnType = ffi.Pointer<
    ffi.NativeFunction<ffi.Bool Function(DartPort, ffi.Pointer<ffi.Void>)>>;
typedef DartPort = ffi.Int64;
