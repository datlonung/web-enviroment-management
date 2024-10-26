import 'package:flutter/material.dart';

import 'View/home_view.dart';

class EnviromentIOT extends StatelessWidget {
  const EnviromentIOT({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        fontFamily: "Be Vietnam Pro",
        scaffoldBackgroundColor: const Color.fromRGBO(247, 247, 247, 1),
        useMaterial3: true,
      ),
      // home: const GoogleMaps(),
      home: const HomeView(),
      // home: const HomeWidget(),
      // home: const MapScreen(),
      // home: const SafeArea(child: CategoryDetailView()),
      // home: const SafeArea(child: TrashAreaDetail()),
    );
  }
}
