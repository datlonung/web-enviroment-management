class TrashCans {
  String id;
  String name;
  double lat;
  double lng;
  String address;
  DateTime createdAt;
  DateTime updatedAt;
  int height;
  String type;
  int width;
  double levelGauges;

  TrashCans({
    required this.id,
    required this.name,
    required this.lat,
    required this.lng,
    required this.address,
    required this.createdAt,
    required this.updatedAt,
    required this.height,
    required this.type,
    required this.width,
    required this.levelGauges,
  });

  factory TrashCans.fromJson(Map<String, dynamic> json) {
    return TrashCans(
      id: json['_id'],
      name: json['name'],
      lat: json['lat'],
      lng: json['lng'],
      address: json['address'],
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
      height: json['height'],
      width: json['width'],
      type: json['type'],
      levelGauges: json['level_gauges'].toDouble(),
    );
  }

  static List<TrashCans> parseTrashCansList(List<dynamic> jsonList) {
    return jsonList.map((json) => TrashCans.fromJson(json)).toList();
  }
}
