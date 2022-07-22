import 'package:flutter/material.dart';

class OAuthNotifier extends ChangeNotifier {
  String _authorizationUrl = "";
  String _pkceVerifier = "";
  String _token = "";

  get authorizationUrl => _authorizationUrl;
  get pkceVerifier => _pkceVerifier;
  get token => _token;

  void setAutorizationUrl(String url) {
    _authorizationUrl = url;
    notifyListeners();
  }

  void setPkceVerifier(String verifier) {
    _pkceVerifier = verifier;
    notifyListeners();
  }

  void setToken(String token) {
    _token = token;
    notifyListeners();
  }
}
