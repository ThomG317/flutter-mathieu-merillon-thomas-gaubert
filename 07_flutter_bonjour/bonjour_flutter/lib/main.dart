import 'package:flutter/material.dart';

void main() => runApp(MonApplication());

class BoutonContactezMoi extends StatelessWidget {

  @override
  Widget build(BuildContext context) {

    showAlertDialog(BuildContext context) {
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text('Contactez-moi'),
              content: Text('Je suis joignable à l\'IMT Atlantique'),
            );
          }
      );
    }

    return ElevatedButton(onPressed: () => {showAlertDialog(context)}, style: ElevatedButton.styleFrom( primary: Color(0xffb74093) ), child: Text('Contactez moi !'));


  }
}

class MonApplication extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Bonjour App'),
          backgroundColor: Color(0xffb74093),
        ),
        body: SingleChildScrollView(
          child: Center(
            child: Column(
                children: [
                  Text('Bonjour', style: TextStyle(fontSize: 40, fontWeight: FontWeight.bold, color: Color(0xffb74093)),),
                  Text('Je suis Thomas', style: TextStyle(fontSize: 20, color: Color(0xffb74093)),),
                  Image.network("https://images.radio-canada.ca/v1/alimentation/recette/4x3/tarte-fraise-fruit-treillis.jpg", height: 350),
                  Container(
                    child: BoutonContactezMoi(),
                    margin: EdgeInsets.fromLTRB(0, 5, 0, 0),
                  )
                ]
            ),
          ),
        )
      )
    );
  }
}
