import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:mapbox_maps_flutter/mapbox_maps_flutter.dart';

import '../Model/place_detail_model.dart';
import '../Model/predictions_model.dart';

class MapScreenProvider extends ChangeNotifier {
  BuildContext? context;
  MapboxMap? _mapboxMap;
  PointAnnotationManager? _pointAnnotationManager;
  PlaceDetail? _placeDetail;

  PlaceDetail? get placeDetail => _placeDetail;
  MapboxMap get mapboxMap => _mapboxMap!;
  PointAnnotationManager get pointAnnotationManager => _pointAnnotationManager!;

  MapScreenProvider(this.context);

  List<dynamic> coordinates = [
    {'id': 4, 'lng': 108.22105360168857, 'lat': 16.0323054351174},
    {'id': 5, 'lng': 108.217697, 'lat': 16.033641},
    {'id': 6, 'lng': 108.22012186684249, 'lat': 16.032802907690822},
  ];

  List<PlacePrediction> filteredPredictions = [];
  List<PlacePrediction> allPredictions = [];
  PolylinePoints polylinePoints = PolylinePoints();
  double? lngStart;
  double? latStart;
  double? lngEnd;
  double? latEnd;
  String duration = "";
  String distance = "";

  void removeLayer() async {
    print("removeLayer");
    await _mapboxMap?.style.removeStyleLayer("line_layer");
    await _mapboxMap?.style.removeStyleSource("line");
    notifyListeners();
  }

  void fetchData() async {
    latStart = 16.032335538834452;
    lngStart = 108.22102950917;
    latEnd = 16.032864776826205;
    lngEnd = 108.22018623985998;
    if (latStart != null &&
        lngStart != null &&
        latEnd != null &&
        lngEnd != null) {
      _mapboxMap?.setBounds(CameraBoundsOptions(
          bounds: CoordinateBounds(
              southwest: Point(
                  coordinates: Position(
                lngStart!,
                latStart!,
              )).toJson(),
              northeast: Point(
                  coordinates: Position(
                lngEnd!,
                latEnd!,
              )).toJson(),
              infiniteBounds: true),
          maxZoom: 18,
          minZoom: 0,
          maxPitch: 10,
          minPitch: 0));

      final String respone =
          await rootBundle.loadString('assets/json/direction.json');
      final data = await json.decode(respone);
      var route = data['routes'][0]['overview_polyline']['points'];
      duration = data['routes'][0]['legs'][0]['duration']['text'];
      distance = data['routes'][0]['legs'][0]['distance']['text'];
      List<PointLatLng> result = polylinePoints.decodePolyline(route);
      List<List<double>> coordinates =
          result.map((point) => [point.longitude, point.latitude]).toList();

      String geojson = '''{
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "name": "Crema to Council Crest"
          },
          "geometry": {
            "type": "LineString",
            "coordinates": $coordinates
          }
        }
      ]
    }''';

      await _mapboxMap?.style.addSource(GeoJsonSource(
        id: "line",
        data: geojson,
      ));
      var lineLayerJson = """{
     "type":"line",
     "id":"line_layer",
     "source":"line",
     "paint":{
     "line-join":"round",
     "line-cap":"round",
     "line-color":"rgb(5, 251, 16)",
     "line-width": 9.0
     }
     }""";

      await _mapboxMap?.style.addPersistentStyleLayer(lineLayerJson, null);
    }
  }
}
