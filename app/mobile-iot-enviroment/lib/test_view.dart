import 'package:flutter/material.dart';

class MyWidget extends StatefulWidget {
  const MyWidget({super.key});

  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  bool _showBottomSheet = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Toggle Bottom Sheet'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            setState(() {
              _showBottomSheet = !_showBottomSheet;
            });
            if (_showBottomSheet) {
              _showModalBottomSheet(context);
            } else {
              Navigator.of(context).pop(); // Close bottom sheet if already open
            }
          },
          child: Text(
              _showBottomSheet ? 'Hide Bottom Sheet' : 'Show Bottom Sheet'),
        ),
      ),
    );
  }

  void _showModalBottomSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isDismissible: false,
      builder: (BuildContext context) {
        return SizedBox(
          height: 200,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text('This is a bottom sheet'),
              ElevatedButton(
                onPressed: () {
                  Navigator.of(context).pop(); // Close bottom sheet
                  setState(() {
                    _showBottomSheet = false; // Update state variable
                  });
                },
                child: const Text('Close'),
              ),
            ],
          ),
        );
      },
    );
  }
}

void main() {
  runApp(const MaterialApp(
    home: MyWidget(),
  ));
}
