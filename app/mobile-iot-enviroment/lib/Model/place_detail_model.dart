import 'compound_model.dart';
import 'location_model.dart';
import 'pluscode_model.dart';

class PlaceDetail {
  String placeId;
  String formattedAddress;
  PlusCode plusCode;
  Compound compound;
  String name;
  String url;
  List<String> types;
  Geometry geometry;

  PlaceDetail(
      {required this.placeId,
      required this.formattedAddress,
      required this.plusCode,
      required this.compound,
      required this.types,
      required this.geometry,
      required this.name,
      required this.url});

  factory PlaceDetail.fromJson(Map<String, dynamic> json) {
    return PlaceDetail(
        formattedAddress: json['formatted_address'] ?? '',
        placeId: json['place_id'] ?? '',
        plusCode: PlusCode.fromJson(json['plus_code'] ?? {}),
        compound: Compound.fromJson(json['compound'] ?? {}),
        types: List<String>.from(json['types'] ?? []),
        geometry: Geometry.fromJson(json['geometry'] ?? {}),
        name: json['name'] ?? '',
        url: json['url'] ?? '');
  }
}

class Geometry {
  LocationModel? location;

  Geometry({this.location});
  factory Geometry.fromJson(Map<String, dynamic> json) {
    return Geometry(
        location: json['location'] != null
            ? LocationModel.fromJson(json['location'])
            : null);
  }
}
