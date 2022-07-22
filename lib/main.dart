import 'dart:async';

import 'package:flutter/material.dart';
import 'package:naia_app/screens/home.screen.dart';
import 'package:provider/provider.dart';
import 'package:uni_links/uni_links.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

import 'notifiers/oauth.notifier.dart';
import 'tools/ffi.tool.dart';

Future main() async {
  await dotenv.load(fileName: ".env");
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  StreamSubscription? _sub;

  void _handleIncomingLinks(OAuthNotifier notifier) {
    _sub = uriLinkStream.listen((Uri? link) async {
      Environment env = Environment(
        auth0ClientSecret: dotenv.env["AUTH0_CLIENT_SECRET"]!,
        auth0ClientId: dotenv.env["AUTH0_CLIENT_ID"]!,
        auth0AuthorizeUrl: dotenv.env["AUTH0_AUTHORIZE_URL"]!,
        auth0TokenUrl: dotenv.env["AUTH0_TOKEN_URL"]!,
        auth0RedirectUrl: dotenv.env["AUTH0_REDIRECT_URL"]!,
      );
      String token = await naiaAPI.getToken(
          pkceVerifier: notifier.pkceVerifier,
          authCode: link!.queryParameters["code"]!,
          env: env);
      notifier.setToken(token);
    }, onError: (err) {});
  }

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: ((context) => OAuthNotifier()),
      builder: (context, provider) {
        return Consumer<OAuthNotifier>(
          builder: (context, notifier, child) {
            _sub?.cancel();
            _handleIncomingLinks(notifier);
            return MaterialApp(
              title: 'Flutter Demo',
              theme: ThemeData(),
              home: const MyHomePage(title: ''),
              debugShowCheckedModeBanner: false,
            );
          },
        );
      },
    );
  }
}
