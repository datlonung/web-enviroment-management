import 'dart:async';

import 'package:flutter/material.dart';
import 'package:location/location.dart';

/* This provider exist because, when user click on 
the "next to map" or "xem trên bản đồ" then we can get two values lng and lat to show 
detail location that where trash area is. 
*/
class LocationProvider extends ChangeNotifier {
  // Get the location of user.
  LocationData? _currentLocation;

  LocationData get currentLocation => _currentLocation!;

  Future<void> getLocation() async {
    Location location = Location();

    bool serviceEnabled;
    PermissionStatus permissionGranted;

    serviceEnabled = await location.serviceEnabled();
    if (!serviceEnabled) {
      serviceEnabled = await location.requestService();
      if (!serviceEnabled) {
        return;
      }
    }

    permissionGranted = await location.hasPermission();
    if (permissionGranted == PermissionStatus.denied) {
      permissionGranted = await location.requestPermission();
      if (permissionGranted != PermissionStatus.granted) {
        return;
      }
    }

    try {
      _currentLocation = await location.getLocation();
      notifyListeners(); // Notify listeners about the change
    } catch (e) {
      print('Error: $e');
    }
  }

  double lng = 0.0;
  double lat = 0.0;

  void setLatLng(double lat, double lng) {
    this.lng = lng;
    this.lat = lat;
  }

  @override
  notifyListeners();
}
