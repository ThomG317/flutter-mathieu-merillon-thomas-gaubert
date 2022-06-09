import 'package:flutter/material.dart';
import '../pages/convertisseur_page.dart';
import '../styles.dart';

class SaisieNombre extends StatelessWidget {

  final onSaisie;

  SaisieNombre(this.onSaisie);


  @override
  Widget build(BuildContext context) {
    return TextField(
      style: AppStyle.inputStyle,
      onChanged: (saisie) => {
       onSaisie(saisie)
      },
    );
  }
}
