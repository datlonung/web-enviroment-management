import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_iot_enviroment/Model/trashcan_information_model.dart';

class TrashCanModel extends ChangeNotifier {
  Future fetchData() async {
    var url = Uri.parse(
      'v',
    );
    final response = await http.get(url);
    print("Response: $response");

    if (response.statusCode == 200) {
      notifyListeners();

      return TrashCans.parseTrashCansList(
          jsonDecode(response.body) as List<dynamic>);
      // return jsonDecode(response.body);
    } else {
      notifyListeners();

      throw Exception('Failed to load Location');
    }
  }
}
