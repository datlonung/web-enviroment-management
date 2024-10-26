import 'package:flutter/material.dart';

import '../../Common/space.dart';
import '../../Theme/global_color.dart';

class HeaderWidget extends StatelessWidget {
  const HeaderWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Image.asset('assets/images/avatar.png'),
        spaceWidth(SMALL),
        const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Chào buổi sáng',
              style: TextStyle(
                fontSize: 14,
                color: SubTextColor,
              ),
            ),
            Text("Đi đổ rác ngay thôi",
                style: TextStyle(
                  fontSize: 17,
                  fontWeight: FontWeight.bold,
                  color: TextColor,
                ))
          ],
        ),
        const Spacer(),
        Container(
          padding: const EdgeInsets.all(12),
          decoration: const BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                    color: Color.fromRGBO(0, 0, 0, 1.2),
                    offset: Offset(1, 1),
                    blurRadius: 10),
              ],
              borderRadius: BorderRadius.all(Radius.circular(100))),
          child: const Icon(
            Icons.add_alert_outlined,
            size: 25,
            color: MainColor,
          ),
        ),
      ],
    );
  }
}
