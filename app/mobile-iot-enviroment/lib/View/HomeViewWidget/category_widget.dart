import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../../Common/assets.dart';
import '../../Common/space.dart';
import '../../Theme/global_color.dart';
import '../category_detail.dart';

class CategoryWidget extends StatelessWidget {
  const CategoryWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 90,
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: [
          // Rác hữu cơ
          GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => const CategoryDetailView()),
              );
            },
            child: Container(
                padding: const EdgeInsets.all(10),
                decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.all(Radius.circular(4))),
                child: Column(
                  children: [
                    //  Image.asset(
                    //     "assets/images/voco.png",
                    //   ),
                    SvgPicture.asset(
                      Assets.HuuCoTrash,
                      width: 35,
                      height: 35,
                    ),
                    spaceHeight(SMALL),
                    const Text(
                      "Rác hữu cơ",
                      style: TextStyle(
                          color: TextColor,
                          fontSize: 16,
                          fontWeight: FontWeight.bold),
                    )
                  ],
                )),
          ),
          spaceWidth(SMALL),
          // Rác vô cơ
          Container(
              padding: const EdgeInsets.all(10),
              decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.all(Radius.circular(4))),
              child: Column(
                children: [
                  //  Image.asset(
                  //     "assets/images/voco.png",
                  //   ),
                  SvgPicture.asset(
                    Assets.VoCoTrash,
                    width: 35,
                    height: 35,
                  ),
                  spaceHeight(SMALL),
                  const Text(
                    "Rác vô cơ",
                    style: TextStyle(
                        color: TextColor,
                        fontSize: 16,
                        fontWeight: FontWeight.bold),
                  )
                ],
              )),
          // Rác thải khác
          spaceWidth(SMALL),
          Container(
              padding: const EdgeInsets.all(10),
              decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.all(Radius.circular(4))),
              child: Column(
                children: [
                  //  Image.asset(
                  //     "assets/images/voco.png",
                  //   ),
                  SvgPicture.asset(
                    Assets.RacThaiKhacTrash,
                    width: 35,
                    height: 35,
                  ),
                  spaceHeight(SMALL),
                  const Text(
                    "Rác thải khác",
                    style: TextStyle(
                        color: TextColor,
                        fontSize: 16,
                        fontWeight: FontWeight.bold),
                  )
                ],
              )),
          spaceWidth(SMALL),
          Container(
              padding: const EdgeInsets.all(10),
              decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.all(Radius.circular(4))),
              child: Column(
                children: [
                  //  Image.asset(
                  //     "assets/images/voco.png",
                  //   ),
                  SvgPicture.asset(
                    Assets.VoCoTrash,
                    width: 35,
                    height: 35,
                  ),
                  spaceHeight(SMALL),
                  const Text(
                    "Rác vô cơ",
                    style: TextStyle(
                        color: TextColor,
                        fontSize: 16,
                        fontWeight: FontWeight.bold),
                  )
                ],
              )),
          spaceWidth(SMALL),
          Container(
              padding: const EdgeInsets.all(10),
              decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.all(Radius.circular(4))),
              child: Column(
                children: [
                  //  Image.asset(
                  //     "assets/images/voco.png",
                  //   ),
                  SvgPicture.asset(
                    Assets.RacThaiKhacTrash,
                    width: 35,
                    height: 35,
                  ),
                  spaceHeight(SMALL),
                  const Text(
                    "Rác thải khác",
                    style: TextStyle(
                        color: TextColor,
                        fontSize: 16,
                        fontWeight: FontWeight.bold),
                  )
                ],
              )),
        ],
      ),
    );
  }
}
