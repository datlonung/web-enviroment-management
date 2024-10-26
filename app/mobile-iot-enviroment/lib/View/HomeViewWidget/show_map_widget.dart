import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../ViewModel/location_provider.dart';

class ShowMapWidget extends StatefulWidget {
  const ShowMapWidget({super.key});

  @override
  State<ShowMapWidget> createState() => _ShowMapWidgetState();
}

class _ShowMapWidgetState extends State<ShowMapWidget> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () async {
        await Provider.of<LocationProvider>(context, listen: false)
            .getLocation();

        if (!mounted) return;
        // Navigator.push(context,
        //     MaterialPageRoute(builder: (context) => const MapScreen()));
      },
      child: Image.asset(
        'assets/images/next_to_map.png',
        width: double.maxFinite,
      ),
    );
  }
}
