import 'dart:io' show Platform;

import 'package:flutter_dotenv/flutter_dotenv.dart';

String getMapboxToken() {
  if (Platform.isAndroid) {
    return dotenv.env['ANDROID_TOKEN']!;
  } else if (Platform.isIOS) {
    return 'YOUR_IOS_TOKEN';
  } else {
    throw Exception('Unsupported platform');
  }
}

String mapboxToken = getMapboxToken();

class Config {
  String API_KEY = dotenv.env['API_KEY']!;
  String PublicKeyAndroid = dotenv.env['PUBLIC_KEY']!;
}
