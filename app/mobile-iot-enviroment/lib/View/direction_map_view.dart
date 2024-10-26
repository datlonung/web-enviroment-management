import 'package:flutter/material.dart';
import 'package:mobile_iot_enviroment/Common/space.dart';

import '../Common/assets.dart';
import '../Theme/global_color.dart';

class DirectionMapView extends StatelessWidget {
  const DirectionMapView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          leading: IconButton(
            icon: const Icon(Icons.arrow_back),
            onPressed: () {
              Navigator.of(context).pop(true);
            },
          ),
          flexibleSpace: SafeArea(
            child: Align(
              alignment: Alignment.center,
              child: TextFormField(
                cursorWidth: 2,
                keyboardType: TextInputType.text,
                autofocus: false,
                autocorrect: false,
                enableSuggestions: false,
                cursorColor: MainColor,
                decoration: const InputDecoration(
                  constraints: BoxConstraints.tightFor(width: 230, height: 36),
                  contentPadding: EdgeInsets.all(0),
                  fillColor: Colors.white,
                  filled: true,
                  prefixIcon: Icon(
                    Icons.search,
                    size: 25,
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.all(Radius.circular(20)),
                    borderSide: BorderSide(width: 2, color: Colors.black54),
                  ),
                  focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(20)),
                      borderSide: BorderSide(width: 2, color: Colors.black54)),
                ),
              ),
            ),
          ),
        ),
        body: SizedBox(
          height: double.maxFinite,
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              Image.asset(
                Assets.GoogleMap,
                height: double.maxFinite,
                fit: BoxFit.fill,
              ),
              Positioned(
                bottom: 0,
                left: 0,
                right: 0,
                child: Container(
                  padding:
                      const EdgeInsets.symmetric(vertical: 30, horizontal: 20),
                  width: double.maxFinite,
                  decoration: const BoxDecoration(
                    color: Color.fromRGBO(171, 196, 170, .75),
                    borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(25),
                        topRight: Radius.circular(25)),
                  ),
                  child: Column(children: [
                    Container(
                      width: double.maxFinite,
                      decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(25)),
                      padding: const EdgeInsets.symmetric(
                          vertical: 10, horizontal: 20),
                      child: const Text.rich(
                          textAlign: TextAlign.center,
                          TextSpan(children: [
                            TextSpan(text: "Khoảng cách với bạn   "),
                            TextSpan(text: "-900m"),
                          ])),
                    ),
                    spaceHeight(SMALL),
                    Container(
                      decoration: BoxDecoration(
                          color: Colors.black,
                          borderRadius: BorderRadius.circular(25)),
                      width: double.maxFinite,
                      child: TextButton(
                          onPressed: () {
                            Navigator.of(context).pop(true);
                          },
                          child: const Text(
                            "Dừng hiện thị tuyến đường",
                            style: TextStyle(color: Colors.white),
                          )),
                    )
                  ]),
                ),
              )
            ],
          ),
        ));
  }
}
