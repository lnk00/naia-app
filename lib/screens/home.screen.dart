import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:naia_app/notifiers/oauth.notifier.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:naia_app/tools/ffi.tool.dart';
import 'package:naia_app/components/notification.component.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  void _onPingPressed() async {
    String message;

    // try {
    //   PingResponse res = await naiaAPI.ping();
    //   message = "Ping from ${res.name} version ${res.version} succeeded";
    // } catch (err) {
    //   message = "Ping not succeeded";
    // }

    message = "Ping not succeeded";

    if (mounted) {
      late OverlayEntry overlay;
      overlay = OverlayEntry(
        builder: (BuildContext context) {
          return NaiaNotification(
            message,
            () => {overlay.remove()},
          );
        },
      );
      Navigator.of(context).overlay?.insert(overlay);
    }
  }

  void _onLoginPressed(OAuthNotifier notifier) async {
    Environment env = Environment(
      auth0ClientSecret: dotenv.env["AUTH0_CLIENT_SECRET"]!,
      auth0ClientId: dotenv.env["AUTH0_CLIENT_ID"]!,
      auth0AuthorizeUrl: dotenv.env["AUTH0_AUTHORIZE_URL"]!,
      auth0TokenUrl: dotenv.env["AUTH0_TOKEN_URL"]!,
      auth0RedirectUrl: dotenv.env["AUTH0_REDIRECT_URL"]!,
    );
    AuthorizationUrl _url = await naiaAPI.getAuthUrl(env: env);
    notifier.setAutorizationUrl(_url.url);
    notifier.setPkceVerifier(_url.pkceVerifier);
    Uri url = Uri.parse(_url.url);
    try {
      await launchUrl(url, mode: LaunchMode.externalApplication);
    } catch (err) {}
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<OAuthNotifier>(
      builder: (context, notifier, child) {
        return Scaffold(
          body: Center(
            child: TextButton(
              style: ButtonStyle(
                padding: MaterialStateProperty.all<EdgeInsets>(
                  const EdgeInsets.all(18),
                ),
                backgroundColor: MaterialStateProperty.all<Color>(Colors.black),
                shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                  RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8.0),
                    side: const BorderSide(color: Colors.black),
                  ),
                ),
              ),
              onPressed: () => {_onPingPressed()},
              child: const Text(
                "Ping Server",
                style: TextStyle(color: Colors.white),
              ),
            ),
          ),
        );
      },
    );
  }
}
