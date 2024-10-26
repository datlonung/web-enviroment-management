import 'compound_model.dart';
import 'pluscode_model.dart';

class PlacePrediction {
  String description;
  List<MatchedSubstring> matchedSubstrings;
  String placeId;
  String reference;
  StructuredFormatting structuredFormatting;
  bool hasChildren;
  PlusCode plusCode;
  Compound compound;
  List<Term> terms;
  List<String> types;
  double? distanceMeters;

  PlacePrediction({
    required this.description,
    required this.matchedSubstrings,
    required this.placeId,
    required this.reference,
    required this.structuredFormatting,
    required this.hasChildren,
    required this.plusCode,
    required this.compound,
    required this.terms,
    required this.types,
    this.distanceMeters,
  });

  factory PlacePrediction.fromJson(Map<String, dynamic> json) {
    return PlacePrediction(
      description: json['description'] ?? '',
      matchedSubstrings: List<MatchedSubstring>.from(
          (json['matched_substrings'] ?? []).map((matchedSubstring) =>
              MatchedSubstring.fromJson(matchedSubstring))),
      placeId: json['place_id'] ?? '',
      reference: json['reference'] ?? '',
      structuredFormatting:
          StructuredFormatting.fromJson(json['structured_formatting'] ?? {}),
      hasChildren: json['has_children'] ?? false,
      plusCode: PlusCode.fromJson(json['plus_code'] ?? {}),
      compound: Compound.fromJson(json['compound'] ?? {}),
      terms: List<Term>.from(
          (json['terms'] ?? []).map((term) => Term.fromJson(term))),
      types: List<String>.from(json['types'] ?? []),
      distanceMeters: json['distance_meters']?.toDouble(),
    );
  }
}

class MatchedSubstring {
  List<dynamic> mainTextMatchedSubstrings;
  List<dynamic> secondaryTextMatchedSubstrings;

  MatchedSubstring({
    required this.mainTextMatchedSubstrings,
    required this.secondaryTextMatchedSubstrings,
  });

  factory MatchedSubstring.fromJson(Map<String, dynamic> json) {
    return MatchedSubstring(
      mainTextMatchedSubstrings: json['main_text_matched_substrings'] ?? [],
      secondaryTextMatchedSubstrings:
          json['secondary_text_matched_substrings'] ?? [],
    );
  }
}

class StructuredFormatting {
  String mainText;
  List<dynamic> mainTextMatchedSubstrings;
  String secondaryText;
  List<dynamic> secondaryTextMatchedSubstrings;

  StructuredFormatting({
    required this.mainText,
    required this.mainTextMatchedSubstrings,
    required this.secondaryText,
    required this.secondaryTextMatchedSubstrings,
  });

  factory StructuredFormatting.fromJson(Map<String, dynamic> json) {
    return StructuredFormatting(
      mainText: json['main_text'] ?? '',
      mainTextMatchedSubstrings: json['main_text_matched_substrings'] ?? [],
      secondaryText: json['secondary_text'] ?? '',
      secondaryTextMatchedSubstrings:
          json['secondary_text_matched_substrings'] ?? [],
    );
  }
}

class Term {
  int offset;
  String value;

  Term({
    required this.offset,
    required this.value,
  });

  factory Term.fromJson(Map<String, dynamic> json) {
    return Term(
      offset: json['offset'] ?? 0,
      value: json['value'] ?? '',
    );
  }
}
