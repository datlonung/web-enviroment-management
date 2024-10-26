import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:mobile_iot_enviroment/Common/space.dart';

import '../Common/assets.dart';
import '../Theme/global_color.dart';

class CategoryDetailView extends StatelessWidget {
  const CategoryDetailView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.white,
        appBar: AppBar(
          title: const Text(
            "Thùng rác hữu cơ",
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          centerTitle: true,
          leading: GestureDetector(
              onTap: () => {Navigator.pop(context)},
              child: const Icon(Icons.arrow_back_sharp)),
        ),
        body: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    spaceHeight(MEDIUM),
                    SvgPicture.asset(
                      Assets.HuuCoTrash,
                      width: 60,
                      height: 60,
                    ),
                    spaceHeight(MEDIUM),
                    FittedBox(
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                            vertical: 5, horizontal: 8),
                        decoration: BoxDecoration(
                          color: BackgroundColor,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Row(children: [
                          const Text(
                            "Tổng số thùng rác:",
                            style: TextStyle(
                                fontSize: 15,
                                color: TextColor,
                                fontWeight: FontWeight.w500),
                          ),
                          spaceWidth(Tiny),
                          const Text(
                            "440",
                            style: TextStyle(
                                fontSize: 15,
                                color: TextColor,
                                fontWeight: FontWeight.bold),
                          )
                        ]),
                      ),
                    ),
                    // Text description
                    spaceHeight(SMALL),
                    const Text(
                        "Là thùng rác đựng các loại rác hữu cơ có khả năng phân tự phân hủy trong môi trường như đồ ăn thừa, chất thải từ nhà bếp (rau củ quả, vỏ trái cây, bã cà phê, bã trà…).",
                        style: TextStyle(
                          color: TextColor,
                          fontSize: 15,
                        )),

                    spaceHeight(MEDIUM),
                  ],
                ),
                const Text(
                  "Thùng rác hữu cơ gần đây",
                  style: TextStyle(
                      fontSize: 19,
                      color: TextColor,
                      fontWeight: FontWeight.w500),
                ),
                spaceHeight(SMALL),
                _huucoTrash(),
                spaceHeight(SMALL),
                _huucoTrash1(),
                spaceHeight(SMALL),
                _huucoTrash2(),
                spaceHeight(SMALL),
                _huucoTrash5(),
                spaceHeight(SMALL),
                _huucoTrash4(),
                spaceHeight(SMALL),
              ],
            ),
          ),
        ));
  }

  Container _huucoTrash1() {
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
                        "30%",
                        style: TextStyle(
                            fontSize: 16,
                            color: TextColor,
                            fontWeight: FontWeight.w500),
                      ),
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

  Container _huucoTrash2() {
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
              ],
            )
          ],
        )
      ]),
    );
  }

  Container _huucoTrash4() {
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
                        "74%",
                        style: TextStyle(
                            fontSize: 16,
                            color: TextColor,
                            fontWeight: FontWeight.w500),
                      ),
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

  Container _huucoTrash5() {
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
                        "29%",
                        style: TextStyle(
                            fontSize: 16,
                            color: TextColor,
                            fontWeight: FontWeight.w500),
                      ),
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

  Container _huucoTrash() {
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
                        "62%",
                        style: TextStyle(
                            fontSize: 16,
                            color: TextColor,
                            fontWeight: FontWeight.w500),
                      ),
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
}
