import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../../Common/assets.dart';
import '../../Common/space.dart';
import '../../Theme/global_color.dart';
import '../trash_area_detail.dart';

class CurrentLocationWidget extends StatelessWidget {
  const CurrentLocationWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => const TrashAreaDetail()),
              );
            },
            child: _areaTrash()),
        spaceHeight(SMALL),
        GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => const TrashAreaDetail()),
              );
            },
            child: _areaTrash1()),
        spaceHeight(SMALL),
        GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => const TrashAreaDetail()),
              );
            },
            child: _areaTrash2()),
        spaceHeight(SMALL),
        _areaTrash(),
        spaceHeight(SMALL),
        _areaTrash1(),
      ],
    );
  }

  Container _areaTrash() {
    return Container(
      padding: const EdgeInsets.all(5),
      height: 105,
      decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.all(Radius.circular(4))),
      child: Row(children: [
        ClipRRect(
          borderRadius: const BorderRadius.all(Radius.circular(4)),
          child: Image.asset(
            "assets/images/Basemap.png",
            scale: 0.1,
          ),
        ),
        spaceWidth(SMALL),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              "DN01-HX-00001",
              style: TextStyle(
                  fontSize: 16, color: TextColor, fontWeight: FontWeight.w500),
            ),
            spaceHeight(Tiny),
            Row(
              children: [
                SvgPicture.asset(
                  "assets/images/location.svg",
                  width: 13,
                  height: 13,
                  color: SubTextColor,
                ),
                spaceWidth(3.0),
                const SizedBox(
                  width: 230,
                  child: Tooltip(
                    message:
                        "14 Doãn Uẩn, Phường Khuê Mỹ, Quận Ngũ Hành Sơn, Đà Nẵng",
                    child: Text(
                      "14 Doãn Uẩn, Phường Khuê Mỹ, Quận Ngũ Hành Sơn, Đà Nẵng",
                      style: TextStyle(
                          fontSize: 13,
                          color: SubTextColor,
                          fontWeight: FontWeight.w500),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
              ],
            ),
            spaceHeight(8.0),
            Row(
              children: [
                Container(
                  padding:
                      const EdgeInsets.symmetric(vertical: 5, horizontal: 8),
                  decoration: BoxDecoration(
                    color: BackgroundColor,
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: const [
                      BoxShadow(
                          color: Color.fromRGBO(0, 0, 0, 1.2),
                          offset: Offset(1, 1),
                          blurRadius: 10),
                    ],
                  ),
                  child: Row(children: [
                    SvgPicture.asset(
                      Assets.HuuCoTrash,
                      width: 18,
                      height: 18,
                    ),
                    spaceWidth(Tiny),
                    const Tooltip(
                      message: "Có thể sử dụng",
                      child: Text(
                        "69%",
                        style: TextStyle(
                            fontSize: 16,
                            color: TextColor,
                            fontWeight: FontWeight.w500),
                      ),
                    )
                  ]),
                ),
                spaceWidth(Tiny),
                Container(
                  padding:
                      const EdgeInsets.symmetric(vertical: 5, horizontal: 8),
                  decoration: BoxDecoration(
                    color: BackgroundColor,
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: const [
                      BoxShadow(
                          color: Color.fromRGBO(0, 0, 0, 1.2),
                          offset: Offset(1, 1),
                          blurRadius: 10),
                    ],
                  ),
                  child: Row(children: [
                    SvgPicture.asset(
                      Assets.VoCoTrash,
                      width: 18,
                      height: 18,
                    ),
                    spaceWidth(Tiny),
                    const Tooltip(
                      message: "Có thể sử dụng",
                      child: Text(
                        "51%",
                        style: TextStyle(
                            fontSize: 16,
                            color: TextColor,
                            fontWeight: FontWeight.w500),
                      ),
                    )
                  ]),
                ),
                spaceWidth(Tiny),
                Container(
                  padding:
                      const EdgeInsets.symmetric(vertical: 5, horizontal: 8),
                  decoration: BoxDecoration(
                    color: BackgroundColor,
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: const [
                      BoxShadow(
                          color: Color.fromRGBO(0, 0, 0, 1.2),
                          offset: Offset(1, 1),
                          blurRadius: 10),
                    ],
                  ),
                  child: Row(children: [
                    SvgPicture.asset(
                      Assets.RacThaiKhacTrash,
                      width: 18,
                      height: 18,
                    ),
                    spaceWidth(Tiny),
                    const Tooltip(
                      message: "Đã đầy",
                      child: Text(
                        "99%",
                        style: TextStyle(
                            fontSize: 16,
                            color: TextColor,
                            fontWeight: FontWeight.w500),
                      ),
                    )
                  ]),
                )
              ],
            )
          ],
        )
      ]),
    );
  }

  Container _areaTrash1() {
    return Container(
      padding: const EdgeInsets.all(5),
      height: 105,
      decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.all(Radius.circular(4))),
      child: Row(children: [
        ClipRRect(
          borderRadius: const BorderRadius.all(Radius.circular(4)),
          child: Image.asset(
            "assets/images/Basemap.png",
            scale: 0.1,
          ),
        ),
        spaceWidth(SMALL),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              "DN01-HX-00001",
              style: TextStyle(
                  fontSize: 16, color: TextColor, fontWeight: FontWeight.w500),
            ),
            spaceHeight(Tiny),
            Row(
              children: [
                SvgPicture.asset(
                  "assets/images/location.svg",
                  width: 13,
                  height: 13,
                  color: SubTextColor,
                ),
                spaceWidth(3.0),
                const SizedBox(
                  width: 230,
                  child: Tooltip(
                    message:
                        "14 Doãn Uẩn, Phường Khuê Mỹ, Quận Ngũ Hành Sơn, Đà Nẵng",
                    child: Text(
                      "14 Doãn Uẩn, Phường Khuê Mỹ, Quận Ngũ Hành Sơn, Đà Nẵng",
                      style: TextStyle(
                          fontSize: 13,
                          color: SubTextColor,
                          fontWeight: FontWeight.w500),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
              ],
            ),
            spaceHeight(8.0),
            Row(
              children: [
                Container(
                  padding:
                      const EdgeInsets.symmetric(vertical: 5, horizontal: 8),
                  decoration: BoxDecoration(
                    color: BackgroundColor,
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: const [
                      BoxShadow(
                          color: Color.fromRGBO(0, 0, 0, 1.2),
                          offset: Offset(1, 1),
                          blurRadius: 10),
                    ],
                  ),
                  child: Row(children: [
                    SvgPicture.asset(
                      Assets.HuuCoTrash,
                      width: 18,
                      height: 18,
                    ),
                    spaceWidth(Tiny),
                    const Text(
                      "35%",
                      style: TextStyle(
                          fontSize: 16,
                          color: TextColor,
                          fontWeight: FontWeight.w500),
                    )
                  ]),
                ),
                spaceWidth(Tiny),
                Container(
                  padding:
                      const EdgeInsets.symmetric(vertical: 5, horizontal: 8),
                  decoration: BoxDecoration(
                    color: BackgroundColor,
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: const [
                      BoxShadow(
                          color: Color.fromRGBO(0, 0, 0, 1.2),
                          offset: Offset(1, 1),
                          blurRadius: 10),
                    ],
                  ),
                  child: Row(children: [
                    SvgPicture.asset(
                      Assets.VoCoTrash,
                      width: 18,
                      height: 18,
                    ),
                    spaceWidth(Tiny),
                    const Text(
                      "18%",
                      style: TextStyle(
                          fontSize: 16,
                          color: TextColor,
                          fontWeight: FontWeight.w500),
                    )
                  ]),
                ),
              ],
            )
          ],
        )
      ]),
    );
  }

  Container _areaTrash2() {
    return Container(
      padding: const EdgeInsets.all(5),
      height: 105,
      decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.all(Radius.circular(4))),
      child: Row(children: [
        ClipRRect(
          borderRadius: const BorderRadius.all(Radius.circular(4)),
          child: Image.asset(
            "assets/images/Basemap.png",
            scale: 0.1,
          ),
        ),
        spaceWidth(SMALL),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              "DN01-HX-00001",
              style: TextStyle(
                  fontSize: 16, color: TextColor, fontWeight: FontWeight.w500),
            ),
            spaceHeight(Tiny),
            Row(
              children: [
                SvgPicture.asset(
                  "assets/images/location.svg",
                  width: 13,
                  height: 13,
                  color: SubTextColor,
                ),
                spaceWidth(3.0),
                const SizedBox(
                  width: 230,
                  child: Tooltip(
                    message:
                        "14 Doãn Uẩn, Phường Khuê Mỹ, Quận Ngũ Hành Sơn, Đà Nẵng",
                    child: Text(
                      "14 Doãn Uẩn, Phường Khuê Mỹ, Quận Ngũ Hành Sơn, Đà Nẵng",
                      style: TextStyle(
                          fontSize: 13,
                          color: SubTextColor,
                          fontWeight: FontWeight.w500),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
              ],
            ),
            spaceHeight(8.0),
            Row(
              children: [
                Container(
                  padding:
                      const EdgeInsets.symmetric(vertical: 5, horizontal: 8),
                  decoration: BoxDecoration(
                    color: BackgroundColor,
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: const [
                      BoxShadow(
                          color: Color.fromRGBO(0, 0, 0, 1.2),
                          offset: Offset(1, 1),
                          blurRadius: 10),
                    ],
                  ),
                  child: Row(children: [
                    SvgPicture.asset(
                      Assets.VoCoTrash,
                      width: 18,
                      height: 18,
                    ),
                    spaceWidth(Tiny),
                    const Text(
                      "54%",
                      style: TextStyle(
                          fontSize: 16,
                          color: TextColor,
                          fontWeight: FontWeight.w500),
                    )
                  ]),
                ),
                spaceWidth(Tiny),
                Container(
                  padding:
                      const EdgeInsets.symmetric(vertical: 5, horizontal: 8),
                  decoration: BoxDecoration(
                    color: BackgroundColor,
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: const [
                      BoxShadow(
                          color: Color.fromRGBO(0, 0, 0, 1.2),
                          offset: Offset(1, 1),
                          blurRadius: 10),
                    ],
                  ),
                  child: Row(children: [
                    SvgPicture.asset(
                      Assets.RacThaiKhacTrash,
                      width: 18,
                      height: 18,
                    ),
                    spaceWidth(Tiny),
                    const Text(
                      "29%",
                      style: TextStyle(
                          fontSize: 16,
                          color: TextColor,
                          fontWeight: FontWeight.w500),
                    )
                  ]),
                )
              ],
            )
          ],
        )
      ]),
    );
  }
}
