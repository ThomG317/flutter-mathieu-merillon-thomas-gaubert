import 'package:convertisseur_devises/widget/liste_devises.dart';
import 'package:convertisseur_devises/widget/saisie_nombre.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../models/devise.dart';
import '../styles.dart';

class ConvertisseurDevisePage extends StatefulWidget {

ConvertisseurDevisePage();

@override
State<StatefulWidget> createState() {
return _ConvertisseurDevisePage();
}
}

class _ConvertisseurDevisePage extends State<ConvertisseurDevisePage> {

  // les différents "états" de la page

  late double _valeur; // valeur saisie
  late Devise _deviseInitial; // devise initiale sélectionnée
  late Devise _deviseFinale; // devise finale sélectionnée
  late double _resultat; // le résultat de la conversion

  // définition des valeurs initiales
  @override
  void initState() {
    super.initState();
    _valeur = 0;
    _resultat = 0;
    _deviseInitial = Devise.EURO;
    _deviseFinale = Devise.DOLLAR;
  }

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Column(
          children: [
            Spacer(),
            Text(
              'Valeur',
              style: AppStyle.labelStyle,
            ),
            Spacer(),
            SaisieNombre(
              (saisie) => {
                setState(() {
                  _valeur = double.parse(saisie);
                })
              },
            ),
            Spacer(),
            Text(
              'De',
              style: AppStyle.labelStyle,
            ),
            Spacer(),
            ListeDevise(
              (Devise? newVal) => {
                setState(() {
                  if (newVal != null) {
                    _deviseInitial = newVal;
                  }
                })
              },
              _deviseInitial
            ),
            Spacer(),
            Text('Vers', style: AppStyle.labelStyle),
            Spacer(),
            ListeDevise(
                (Devise? newVal) => {
                  setState(() {
                    if (newVal != null) {
                      _deviseFinale = newVal;
                    }
                  })
                },
                _deviseFinale
            ),
            Spacer(
              flex: 2,
            ),
            ElevatedButton(onPressed: () => {
              setState(() {
                double? tInit = taux[_deviseInitial];
                double? tFin = taux[_deviseFinale];
                if (tInit != null && tFin != null) {
                  _resultat = (_valeur / tInit) * tFin;
                }
              })
            }, child: Text('Convertir')),
            Spacer(
              flex: 2,
            ),
            Text(_resultat.toString(), style: AppStyle.labelStyle),
            Spacer(),
          ],
        ));
  }
}
