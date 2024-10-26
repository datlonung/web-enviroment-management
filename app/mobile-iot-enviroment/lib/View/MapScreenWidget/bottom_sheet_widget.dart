import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:mobile_iot_enviroment/ViewModel/map_screen_provider.dart';
import 'package:provider/provider.dart';

import '../../Common/assets.dart';
import '../../Common/space.dart';
import '../../Theme/global_color.dart';

class BottomSheetWidget extends StatelessWidget {
  const BottomSheetWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: MediaQuery.of(context).size.height * 0.35,
      child: Scaffold(
        resizeToAvoidBottomInset: true,
        body: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
          spaceHeight(SMALL),
          Align(
            alignment: Alignment.center,
            child: Container(
              height: 3,
              width: 50,
              color: const Color.fromRGBO(217, 217, 217, 1),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(10.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "DN01-HX-00001",
                  style: TextStyle(
                      fontSize: 19,
                      color: TextColor,
                      fontWeight: FontWeight.w500),
                ),
                spaceHeight(SMALL),
                // Trash infomation
                SizedBox(
                  height: 30,
                  child: ListView(
                    clipBehavior: Clip.none,
                    scrollDirection: Axis.horizontal,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(
                            vertical: 5, horizontal: 8),
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
                            "Rác vô cơ",
                            style: TextStyle(
                                fontSize: 16,
                                color: TextColor,
                                fontWeight: FontWeight.w500),
                          ),
                          spaceWidth(Tiny),
                          const Text(
                            "23%",
                            style: TextStyle(
                                fontSize: 16,
                                color: TextColor,
                                fontWeight: FontWeight.w500),
                          )
                        ]),
                      ),
                      spaceWidth(SMALL),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            vertical: 5, horizontal: 8),
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
                            "Rác hữu cơ",
                            style: TextStyle(
                                fontSize: 16,
                                color: TextColor,
                                fontWeight: FontWeight.w500),
                          ),
                          spaceWidth(Tiny),
                          const Text(
                            "(67%)",
                            style: TextStyle(
                                fontSize: 16,
                                color: TextColor,
                                fontWeight: FontWeight.w500),
                          )
                        ]),
                      ),
                      spaceWidth(SMALL),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            vertical: 5, horizontal: 8),
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
                            "Rác thải khác",
                            style: TextStyle(
                                fontSize: 16,
                                color: TextColor,
                                fontWeight: FontWeight.w500),
                          ),
                          spaceWidth(Tiny),
                          const Text(
                            "(15%)",
                            style: TextStyle(
                                fontSize: 16,
                                color: TextColor,
                                fontWeight: FontWeight.w500),
                          )
                        ]),
                      ),
                    ],
                  ),
                ),
                spaceHeight(SMALL),
                // Time to go
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    SvgPicture.asset(
                      "assets/images/car_direction.svg",
                      height: 15,
                      width: 15,
                    ),
                    spaceWidth(Tiny),
                    const Text("5 phút",
                        style: TextStyle(
                            color: TextColor, fontWeight: FontWeight.w500)),
                    spaceWidth(Tiny),
                    Container(
                      height: 5,
                      width: 5,
                      decoration: const BoxDecoration(
                          color: SubTextColor,
                          borderRadius: BorderRadius.all(Radius.circular(50))),
                    ),
                    spaceWidth(Tiny),
                    SvgPicture.asset(
                      "assets/images/walk_line.svg",
                      height: 15,
                      width: 15,
                    ),
                    spaceWidth(Tiny),
                    const Text("10 phút",
                        style: TextStyle(
                            color: TextColor, fontWeight: FontWeight.w500))
                  ],
                ),
                spaceHeight(SMALL),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    SvgPicture.asset(
                      "assets/images/location.svg",
                      width: 15,
                      height: 15,
                      color: SubTextColor,
                    ),
                    spaceWidth(Tiny),
                    const Expanded(
                      child: Text(
                          "14 Doãn Uẩn, Phường Khuê Mỹ, Quận Ngũ Hành Sơn, Đà Nẵng",
                          softWrap: true,
                          style: TextStyle(
                              color: SubTextColor,
                              fontWeight: FontWeight.w500)),
                    ),
                  ],
                ),
                spaceHeight(MEDIUM),
                Container(
                    padding: const EdgeInsets.symmetric(vertical: 8),
                    decoration: const BoxDecoration(
                        color: MainColor,
                        borderRadius: BorderRadius.all(Radius.circular(50))),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        SvgPicture.asset(
                          "assets/images/duongdi.svg",
                          height: 20,
                          width: 20,
                        ),
                        spaceWidth(SMALL),
                        const Text(
                          "Bắt đầu",
                          style: TextStyle(color: Colors.white, fontSize: 16),
                        )
                      ],
                    )),
              ],
            ),
          )
        ]),
      ),
    );
  }
}

class BottomSheetExitWidget extends StatefulWidget {
  const BottomSheetExitWidget({super.key});

  @override
  State<BottomSheetExitWidget> createState() => _BottomSheetExitWidgetState();
}

class _BottomSheetExitWidgetState extends State<BottomSheetExitWidget> {
  @override
  Widget build(BuildContext context) {
    MapScreenProvider mapScreenProvider =
        Provider.of<MapScreenProvider>(context, listen: false);
    return Container(
      decoration: const BoxDecoration(color: Colors.white10, boxShadow: [
        BoxShadow(
            blurRadius: 10, color: Colors.grey, blurStyle: BlurStyle.outer)
      ]),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
      width: double.maxFinite,
      child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
        RichText(
            text: const TextSpan(children: [
          TextSpan(
            text: "5 Phút ",
            style: TextStyle(
                fontSize: 14, color: TextColor, fontWeight: FontWeight.w500),
          ),
          TextSpan(
            text: "(500m)",
            style: TextStyle(fontSize: 14, color: SubTextColor),
          )
        ])),
        Container(
          padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 10),
          decoration: BoxDecoration(
              color: Colors.red, borderRadius: BorderRadius.circular(20)),
          child: Row(
            children: [
              SvgPicture.asset(Assets.CloseCircleLine),
              spaceWidth(Tiny),
              GestureDetector(
                  onTap: () {
                    debugPrint("Thoát");
                    mapScreenProvider.removeLayer();

                    Navigator.of(context).pop();
                  },
                  child: const Text("Thoát",
                      style: TextStyle(color: Colors.white))),
            ],
          ),
        )
      ]),
    );
  }
}
