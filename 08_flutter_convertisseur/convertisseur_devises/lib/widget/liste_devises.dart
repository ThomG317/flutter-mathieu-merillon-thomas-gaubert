import 'package:flutter/material.dart';
import '../models/devise.dart';

class ListeDevise extends StatelessWidget {

  final onSelect;
  final selectValue;

  ListeDevise(this.onSelect, this.selectValue);

  @override
  Widget build(BuildContext context) {

    return DropdownButton<Devise>(
        isExpanded: true,
        value: selectValue,
        onChanged: (Devise? newVal) => {
          onSelect(newVal)
        },
        items: [
          DropdownMenuItem<Devise>(child: Text('Euro'), value: Devise.EURO),
          DropdownMenuItem<Devise>(child: Text('Dollar'), value: Devise.DOLLAR),
        ]);
  }
}
