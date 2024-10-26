class Compound {
  String district;
  String commune;
  String province;

  Compound({
    required this.district,
    required this.commune,
    required this.province,
  });

  factory Compound.fromJson(Map<String, dynamic> json) {
    return Compound(
      district: json['district'] ?? '',
      commune: json['commune'] ?? '',
      province: json['province'] ?? '',
    );
  }
}
