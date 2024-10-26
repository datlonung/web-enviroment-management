import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile_iot_enviroment/ViewModel/location_provider.dart';
import 'package:mobile_iot_enviroment/ViewModel/map_screen_provider.dart';
import 'package:mobile_iot_enviroment/app.dart';
import 'package:provider/provider.dart';

import 'ViewModel/trashcan_data_provider.dart';

Future<void> main() async {
  await dotenv.load(fileName: ".env");
  // WidgetsFlutterBinding.ensureInitialized();
  runApp(MultiProvider(
    providers: [
      ChangeNotifierProvider(
        create: (_) => TrashCanModel(),
      ),
      ChangeNotifierProvider(
        create: (_) => LocationProvider(),
      ),
      ChangeNotifierProvider(
        create: (BuildContext context) => MapScreenProvider(context),
      ),
    ],
    child: const EnviromentIOT(),
  ));
}
