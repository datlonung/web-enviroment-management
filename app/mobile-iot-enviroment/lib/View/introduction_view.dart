import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:introduction_screen/introduction_screen.dart';
import 'package:mobile_iot_enviroment/Common/assets.dart';
import 'package:mobile_iot_enviroment/Common/space.dart';

class IntroductionView extends StatelessWidget {
  const IntroductionView({super.key});

  @override
  Widget build(BuildContext context) {
    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle.dark.copyWith(
      statusBarColor: const Color(0xffECECEC).withOpacity(1.0),
    ));
    // Size height various types of mobile phone follow screen.
    double heightScreen = MediaQuery.of(context).size.height;

    return IntroductionScreen(
      showSkipButton: false,
      showNextButton: false,
      showDoneButton: false,
      onDone: () {},
      baseBtnStyle: TextButton.styleFrom(
        backgroundColor: Colors.grey.shade200,
      ),
      bodyPadding: const EdgeInsets.only(top: -10),
      dotsDecorator: DotsDecorator(
        size: const Size.square(10.0),
        activeSize: const Size(30.0, 10.0),
        activeColor: Colors.green,
        color: Colors.black26,
        spacing: const EdgeInsets.symmetric(horizontal: 3.0),
        activeShape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0)),
      ),
      controlsPosition: const Position(
        bottom: 0,
        left: 150,
        right: -100,
      ),
      pages: [
        introduction_1(heightScreen),
        introduction_2(heightScreen),
        introduction_3(heightScreen),
        introduction_4(heightScreen, context),
      ],
    );
  }

  PageViewModel introduction_4(double heightScreen, BuildContext context) {
    return PageViewModel(
        title: "",
        decoration: const PageDecoration(
          bodyPadding: EdgeInsets.all(0),
          contentMargin: EdgeInsets.all(0),
          pageMargin: EdgeInsets.all(0),
          titlePadding: EdgeInsets.all(0),
        ),
        bodyWidget: Stack(
          children: [
            CustomPaint(
              painter: RPSCustomPainter(),
            ),
            Container(
              margin: EdgeInsets.only(top: heightScreen / 6),
              padding: const EdgeInsets.symmetric(horizontal: 40),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Image.asset(
                    Assets.Recycle,
                  ),
                  spaceHeight(LARGE + SMALL),
                  const Text(
                    "RECYCLE",
                    style: TextStyle(fontSize: 40, fontWeight: FontWeight.bold),
                  ),
                  spaceHeight(LARGE),
                  const Text(
                    "Recycle product will make the save the environment..",
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 25),
                  ),
                  spaceHeight(MEDIUM),
                  // TextButton(
                  //   onPressed: () {
                  //     Navigator.of(context).push(MaterialPageRoute(
                  //         builder: (_) => const GoogleMaps()));
                  //   },
                  //   style: const ButtonStyle(
                  //     backgroundColor: MaterialStatePropertyAll(Colors.green),
                  //   ),
                  //   child: const Text(
                  //     "Get Started",
                  //     style: TextStyle(
                  //       color: Colors.white,
                  //     ),
                  //   ),
                  // )
                ],
              ),
            ),
          ],
        ));
  }

  PageViewModel introduction_3(double heightScreen) {
    return PageViewModel(
        title: "",
        decoration: const PageDecoration(
          bodyPadding: EdgeInsets.all(0),
          contentMargin: EdgeInsets.all(0),
          pageMargin: EdgeInsets.all(0),
          titlePadding: EdgeInsets.all(0),
        ),
        bodyWidget: Stack(
          children: [
            CustomPaint(
              painter: RPSCustomPainter(),
            ),
            Container(
              margin: EdgeInsets.only(top: heightScreen / 6),
              padding: const EdgeInsets.symmetric(horizontal: 40),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Image.asset(
                    Assets.Reduce,
                    height: 300,
                  ),
                  spaceHeight(LARGE + SMALL),
                  const Text(
                    "REDUCE",
                    style: TextStyle(fontSize: 40, fontWeight: FontWeight.bold),
                  ),
                  spaceHeight(LARGE),
                  const Text(
                    "Utilise plastic as minimum as possible.",
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 25),
                  )
                ],
              ),
            ),
          ],
        ));
  }

  PageViewModel introduction_2(double heightScreen) {
    return PageViewModel(
        title: "",
        decoration: const PageDecoration(
          bodyPadding: EdgeInsets.all(0),
          contentMargin: EdgeInsets.all(0),
          pageMargin: EdgeInsets.all(0),
          titlePadding: EdgeInsets.all(0),
        ),
        bodyWidget: Stack(children: [
          CustomPaint(
            painter: RPSCustomPainter(),
          ),
          Container(
            margin: EdgeInsets.only(top: heightScreen / 6),
            padding: const EdgeInsets.symmetric(horizontal: 40),
            child: Column(
              children: [
                Image.asset(
                  Assets.Reuse,
                ),
                spaceHeight(LARGE + SMALL),
                const Text(
                  "REUSE",
                  style: TextStyle(fontSize: 40, fontWeight: FontWeight.bold),
                ),
                spaceHeight(LARGE),
                const Text(
                  "Utilise the product in different way possible.",
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 25),
                )
              ],
            ),
          ),
        ]));
  }

  PageViewModel introduction_1(double heightScreen) {
    return PageViewModel(
        title: "",
        bodyWidget: Padding(
          padding: EdgeInsets.symmetric(
              horizontal: heightScreen / 48, vertical: heightScreen / 23),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Image.asset(
                Assets.Earth,
              ),
              spaceHeight(LARGE),
              const SizedBox(
                width: 200,
                child: Text(
                  "The planet wiser",
                  style: TextStyle(
                      fontSize: 40, fontWeight: FontWeight.bold, height: 0.9),
                ),
              ),
              spaceHeight(LARGE + MEDIUM),
              const SizedBox(
                width: 250,
                child: Text(
                  "think before you trash it.",
                  style: TextStyle(fontSize: 25, height: 0.9),
                ),
              )
            ],
          ),
        ));
  }
}

//CustomPainter for background of introduction UI screen
class RPSCustomPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    Path path_0 = Path();
    path_0.moveTo(153.969, 544.274);
    path_0.cubicTo(84.2606, 569.365, 21.6111, 505.942, -1, 471.094);
    path_0.lineTo(-1, -1);
    path_0.lineTo(429.163, -1);
    path_0.cubicTo(469.79, 146.461, 526.667, 434.119, 429.163, 405.067);
    path_0.cubicTo(307.284, 368.752, 241.105, 512.911, 153.969, 544.274);
    path_0.close();

    Paint paint0Fill = Paint()..style = PaintingStyle.fill;
    paint0Fill.color = const Color(0xffECECEC).withOpacity(1.0);
    canvas.drawPath(path_0, paint0Fill);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return true;
  }
}
