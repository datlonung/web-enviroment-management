import 'package:flutter/material.dart';
import 'package:mobile_iot_enviroment/Theme/global_color.dart';

import '/Common/space.dart';
import 'HomeViewWidget/category_widget.dart';
import 'HomeViewWidget/current_location_widget.dart';
import 'HomeViewWidget/header_widget.dart';
import 'HomeViewWidget/show_map_widget.dart';

class HomeView extends StatefulWidget {
  const HomeView({super.key});

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const HeaderWidget(),
                spaceHeight(MEDIUM),
                const Text(
                  "Danh Mục",
                  style: TextStyle(
                      fontSize: 19,
                      color: TextColor,
                      fontWeight: FontWeight.w500),
                ),
                spaceHeight(SMALL),
                const CategoryWidget(),
                spaceHeight(LARGE),

                // Current Location
                Row(
                  children: [
                    const Text(
                      "Địa điểm gần đây",
                      style: TextStyle(
                          fontSize: 19,
                          color: TextColor,
                          fontWeight: FontWeight.w500),
                    ),
                    const Spacer(),
                    TextButton(
                      onPressed: () {},
                      child: const Text(
                        "Xem tất cả",
                        style: TextStyle(
                            fontSize: 14,
                            color: MainColor,
                            fontWeight: FontWeight.w500),
                      ),
                    ),
                  ],
                ),
                const CurrentLocationWidget(),

                spaceHeight(LARGE),
                const Text(
                  "Bản đồ",
                  style: TextStyle(
                      fontSize: 19,
                      color: TextColor,
                      fontWeight: FontWeight.w500),
                ),

                const ShowMapWidget(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
