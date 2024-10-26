import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:mobile_iot_enviroment/Common/space.dart';
import 'package:provider/provider.dart';

import '../Common/assets.dart';
import '../Theme/global_color.dart';
import '../ViewModel/location_provider.dart';
import 'map_screen.dart';

class TrashAreaDetail extends StatefulWidget {
  const TrashAreaDetail({super.key});

  @override
  State<TrashAreaDetail> createState() => _TrashAreaDetailState();
}

class _TrashAreaDetailState extends State<TrashAreaDetail> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.white,
        appBar: AppBar(
          leading: GestureDetector(
              onTap: () => {Navigator.pop(context)},
              child: const Icon(Icons.arrow_back_sharp)),
        ),
        body: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const Text(
                    "DN01-HX-00001",
                    style: TextStyle(
                        fontSize: 19,
                        color: TextColor,
                        fontWeight: FontWeight.w500),
                  ),
                  spaceHeight(SMALL),
                  Row(
                    children: [
                      SvgPicture.asset(
                        "assets/images/location.svg",
                        width: 25,
                        height: 25,
                        color: SubTextColor,
                      ),
                      spaceWidth(SMALL),
                      const Expanded(
                        child: Text(
                            "14 Doãn Uẩn, Phường Khuê Mỹ, Quận Ngũ Hành Sơn, Đà Nẵng",
                            softWrap: true,
                            style: TextStyle(
                                fontSize: 15,
                                color: SubTextColor,
                                fontWeight: FontWeight.w500)),
                      ),
                    ],
                  ),
                  spaceHeight(MEDIUM),
                  Row(
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
                    ],
                  ),
                  spaceHeight(SMALL),
                  FittedBox(
                    child: Container(
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
                          "30%",
                          style: TextStyle(
                              fontSize: 16,
                              color: TextColor,
                              fontWeight: FontWeight.w500),
                        )
                      ]),
                    ),
                  ),
                  spaceHeight(MEDIUM),
                  Row(
                    children: [
                      Flexible(
                        child: GestureDetector(
                          onTap: () async {
                            await Provider.of<LocationProvider>(context,
                                    listen: false)
                                .getLocation();
                            if (!mounted) return;
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => const MapScreen(),
                              ),
                            );
                          },
                          child: Container(
                              padding: const EdgeInsets.symmetric(vertical: 8),
                              decoration: const BoxDecoration(
                                  color: MainColor,
                                  borderRadius:
                                      BorderRadius.all(Radius.circular(50))),
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
                                    "Xem trên bản đồ",
                                    style: TextStyle(
                                        color: Colors.white, fontSize: 16),
                                  )
                                ],
                              )),
                        ),
                      ),
                      spaceWidth(SMALL),
                      Container(
                        padding: const EdgeInsets.all(5),
                        decoration: BoxDecoration(
                            color: const Color.fromRGBO(239, 246, 241, 1),
                            border: Border.all(
                              color: MainColor,
                            ),
                            borderRadius:
                                const BorderRadius.all(Radius.circular(50))),
                        child: SvgPicture.asset(
                          "assets/images/daluu.svg",
                          height: 20,
                          width: 20,
                          color: MainColor,
                        ),
                      ),
                      spaceWidth(SMALL),
                      Container(
                        padding: const EdgeInsets.all(5),
                        decoration: BoxDecoration(
                            color: const Color.fromRGBO(239, 246, 241, 1),
                            border: Border.all(
                              color: MainColor,
                            ),
                            borderRadius:
                                const BorderRadius.all(Radius.circular(50))),
                        child: SvgPicture.asset(
                          "assets/images/chiase.svg",
                          height: 20,
                          width: 20,
                          color: MainColor,
                        ),
                      ),
                    ],
                  )
                ],
              ),
            ],
          ),
        ));
  }
}
