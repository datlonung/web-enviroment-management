import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:mapbox_maps_flutter/mapbox_maps_flutter.dart';
import 'package:mobile_iot_enviroment/ViewModel/location_provider.dart';
import 'package:provider/provider.dart';

import '../Common/debouncer.dart';
import '../Model/place_detail_model.dart';
import '../Model/predictions_model.dart';
import '../Theme/global_color.dart';
import '../config.dart';
import 'MapScreenWidget/bottom_sheet_widget.dart';

class MapScreen extends StatefulWidget {
  const MapScreen({super.key});
  @override
  State createState() => MapScreenState();
}

class MapScreenState extends State<MapScreen> {
  MapboxMap? _mapboxMap;

  PointAnnotationManager? _pointAnnotationManager;
  // CircleAnnotationManager? _circleAnnotationManager;
  // ignore: non_constant_identifier_names
  // @override

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

  void _fetchData() async {
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

  PlaceDetail? _placeDetail;
  Future<void> readJson() async {
    final String response =
        await rootBundle.loadString('assets/json/autocomplete.json');
    final data = await json.decode(response);
    List<dynamic> predictionsList = data['predictions'] ?? [];
    List<PlacePrediction> placePredictions = predictionsList.map((prediction) {
      return PlacePrediction.fromJson(prediction);
    }).toList();

    final String response2 =
        await rootBundle.loadString('assets/json/placedetail.json');
    final data2 = await json.decode(response2);
    Map<String, dynamic> placeDetail = data2['result'] ?? [];
    PlaceDetail place = PlaceDetail.fromJson(placeDetail);
    setState(() {
      allPredictions = placePredictions;
      _placeDetail = place;
    });
  }

  final TextEditingController _searchController = TextEditingController();
  // final TextEditingController _lat = TextEditingController();
  // final TextEditingController _lng = TextEditingController();
  final Debouncer _debouncer = Debouncer(milliseconds: 2000);
  bool isShow = false;
  _onMapCreated(MapboxMap mapboxMap) {
    _mapboxMap = mapboxMap;
    initMarker();
  }

  void _searchQuery() {
    String query = _searchController.text.toLowerCase();
    // Chặn người dùng Request API liên tục khi search.
    _debouncer.run(() {
      setState(() {
        filteredPredictions = allPredictions.where((item) {
          return item.description.toLowerCase().contains(query);
        }).toList();
      });
    });
  }

  void initMarker() {
    // Tạo ảnh mặc định trên Map
    try {
      _mapboxMap!.annotations
          .createPointAnnotationManager()
          .then((value) async {
        _pointAnnotationManager = value;
        final ByteData bytes =
            await rootBundle.load('assets/images/trashcan_green.png');
        final Uint8List list = bytes.buffer.asUint8List();
        for (var coordinate in coordinates) {
          // final id = coordinate["id"];
          final lng = coordinate['lng'];
          final lat = coordinate['lat'];
          final options = PointAnnotationOptions(
            geometry: Point(coordinates: Position(lng, lat)).toJson(),
            image: list,
          );
          await _pointAnnotationManager?.create(options);
          if (!mounted) {
            return;
          }
          _pointAnnotationManager?.addOnPointAnnotationClickListener(
              AnnotationClickListener(context, _mapboxMap!));
        }
      });
    } catch (e) {
      print("Lỗi ở đây: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        // Navigation View
        body: Consumer<LocationProvider>(
            builder: (context, locationProvider, child) {
          return Stack(alignment: Alignment.center, children: [
            SizedBox(
              child: MapWidget(
                  key: const ValueKey("mapWidget"),
                  resourceOptions: ResourceOptions(accessToken: mapboxToken),
                  cameraOptions: CameraOptions(
                      center: Point(
                              coordinates: Position(
                                  108.22105360168857, 16.0323054351174))
                          .toJson(),
                      zoom: 15),
                  onMapCreated: _onMapCreated),
            ),
            Positioned(top: 10, left: 20, right: 20, child: _search()),
            filteredPredictions.isNotEmpty
                ? Positioned(
                    top: 50,
                    left: 20,
                    right: 20,
                    child: Container(
                      height: 250,
                      decoration: const BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.only(
                              bottomLeft: Radius.circular(30),
                              bottomRight: Radius.circular(30))),
                      child: ListView.builder(
                        itemCount: filteredPredictions.length,
                        itemBuilder: (context, index) {
                          return GestureDetector(
                            onTap: () {
                              if (filteredPredictions[index].placeId ==
                                  _placeDetail?.placeId) {
                                print(
                                    "Lat: ${locationProvider.currentLocation.latitude != null ? "" : "Khong co lat"}");
                                // print(
                                //     'Origin: ${currentLocation!.latitude}, ${currentLocation!.longitude}');
                                print(
                                    "Destination: ${_placeDetail?.geometry.location?.lat}, lng ${_placeDetail?.geometry.location?.lng}");
                                setState(() {
                                  filteredPredictions = [];
                                });
                                _mapboxMap!.setCamera(CameraOptions(
                                  center: Point(
                                          coordinates: Position(
                                              _placeDetail?.geometry.location
                                                  ?.lng as double,
                                              _placeDetail?.geometry.location
                                                  ?.lat as double))
                                      .toJson(),
                                ));
                                _mapboxMap!.flyTo(
                                    CameraOptions(
                                        anchor: ScreenCoordinate(x: 0, y: 0),
                                        bearing: 0,
                                        pitch: 0),
                                    MapAnimationOptions(
                                        duration: 2000, startDelay: 0));
                              }
                            },
                            child: Padding(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 10, vertical: 5),
                              child: Row(
                                children: [
                                  SvgPicture.asset(
                                    "assets/images/location.svg",
                                    width: 20,
                                    height: 20,
                                    color: SubTextColor,
                                  ),
                                  Container(
                                    padding: const EdgeInsets.only(
                                        top: 10, bottom: 10, left: 10),
                                    width: 300,
                                    child: Text(
                                      filteredPredictions[index].description,
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                  )
                : const SizedBox.shrink(),
            Positioned(
                top: 50,
                left: 20,
                child: Text(
                    'Latitude: ${locationProvider.currentLocation.latitude}, Longitude: ${locationProvider.currentLocation.longitude}')),
            Positioned(
              bottom: 30,
              left: 20,
              right: 30,
              child: TextButton(
                child: const Text("Click here to get all locations"),
                onPressed: () {
                  readJson();
                },
              ),
            ),
            Positioned(
                top: 100,
                left: 100,
                child: TextButton(
                  onPressed: () async {
                    _fetchData();

                    showModalBottomSheet(
                      barrierColor: Colors.transparent,
                      shape: const BeveledRectangleBorder(),
                      isDismissible: false,
                      context: context,
                      builder: (_) => const BottomSheetExitWidget(),
                    );
                  },
                  child: const Text("Get Direction"),
                ))
          ]);
        }),
      ),
    );
  }

  Widget _search() {
    return Container(
      decoration: BoxDecoration(boxShadow: [
        BoxShadow(
          color: SubTextColor.withOpacity(0.2), // color of the shadow
          spreadRadius: 5, // spread radius
          blurRadius: 30, // blur radius
          offset: const Offset(0, 0), // changes position of shadow
        ),
      ]),
      child: TextFormField(
        onChanged: (value) => _searchQuery(),
        style: const TextStyle(
          // Custom text style
          fontSize: 18.0,
          fontFamily: "",
          // Add any other custom text style properties here
        ),
        controller: _searchController,
        keyboardType: TextInputType.text,
        autofocus: false,
        autocorrect: false,
        enableSuggestions: false,
        decoration: InputDecoration(
          hintText: "Thùng rác gần đây?",
          constraints: const BoxConstraints.tightFor(width: 300, height: 40),
          contentPadding:
              const EdgeInsets.only(top: 0, left: 0, bottom: 0, right: 12),
          fillColor: Colors.white,
          filled: true,
          prefixIcon: Padding(
            padding: const EdgeInsets.only(left: 15, right: 5),
            child: SvgPicture.asset(
              "assets/images/search_icon.svg",
              width: 25,
              height: 25,
            ),
          ),
          prefixIconConstraints:
              const BoxConstraints(maxHeight: 40, maxWidth: 40),
          enabledBorder: const OutlineInputBorder(
              borderRadius: BorderRadius.all(Radius.circular(20)),
              borderSide: BorderSide(color: Colors.transparent)),
          focusedBorder: const OutlineInputBorder(
              borderRadius: BorderRadius.only(
                  topRight: Radius.circular(20), topLeft: Radius.circular(20)),
              borderSide: BorderSide(color: Colors.transparent)),
        ),
      ),
    );
  }
}

class AnnotationClickListener extends OnPointAnnotationClickListener {
  final BuildContext context;
  final MapboxMap _mapboxMap;
  AnnotationClickListener(this.context, this._mapboxMap);
  @override
  void onPointAnnotationClick(PointAnnotation annotation) {
    final coordinates = annotation.geometry!['coordinates'];
    final newValue = coordinates as List;
    double lng = newValue[0];
    double lat = newValue[1];
    _mapboxMap.setCamera(CameraOptions(
      center: Point(coordinates: Position(lng, lat)).toJson(),
    ));
    _mapboxMap.flyTo(
        CameraOptions(
            anchor: ScreenCoordinate(x: 0, y: 0), bearing: 0, pitch: 0),
        MapAnimationOptions(duration: 2000, startDelay: 0));

    showModalBottomSheet(
        backgroundColor: Colors.white,
        barrierColor: Colors.transparent,
        context: context,
        builder: (_) {
          return const BottomSheetWidget();
        });
  }
}
