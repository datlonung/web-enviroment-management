class LocationModel {
  double lat, lng;
  LocationModel({required this.lat, required this.lng});

  factory LocationModel.fromJson(Map<String, dynamic> json) {
    return LocationModel(lat: json['lat'], lng: json['lng']);
  }
}
