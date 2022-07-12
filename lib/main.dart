import 'package:flutter/material.dart';
import 'package:naia_app/ffi.dart';
import 'notifiation.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(),
      home: const MyHomePage(title: ''),
      debugShowCheckedModeBanner: false,
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  void _onPingPressed() async {
    String message;

    try {
      PingResponse res = await naiaAPI.ping();
      message = "Ping from ${res.name} version ${res.version} succeeded";
    } catch (err) {
      message = "Ping not succeeded";
    }

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

  @override
  Widget build(BuildContext context) {
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
          onPressed: _onPingPressed,
          child: const Text(
            "Ping Server",
            style: TextStyle(color: Colors.white),
          ),
        ),
      ),
    );
  }
}
