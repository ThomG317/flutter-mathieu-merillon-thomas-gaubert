// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
//
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, {useState} from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import {Entete} from './src/Entete'
import {Saisie} from './src/Saisie'
import {BoutonCreer} from './src/BoutonCreer'
import {ListeActions} from './src/action/ListeActions'
import Menu from './src/menu/Menu'

/**
 * Composant d'entrée de l'application.
 */
export default function App() {

  // états de l'application
  // il y aura probablement d'autres informations à stocker
  const [texteSaisie, setTexteSaisie] = useState('');

  const [actions, setActions] = useState([]);

  const [selectedTab, setSelectedTab] = useState('Tous');


  /**
   * Méthode invoquée lorsque que la saisie change.
   *
   * @param nouvelleSaisie la valeur saisie
   */
  const quandLaSaisieChange = (nouvelleSaisie) => {
    console.log('la saisie à changée', nouvelleSaisie)
    setTexteSaisie(nouvelleSaisie);
  }

  /**
   * Méthode invoquée lors du clic sur le bouton `Valider`.
   */
  const validerNouvelleAction = () => {
    console.log('Vous avez cliqué sur Valider !')
    setActions([...actions, { title: texteSaisie, done: false }]);
    setTexteSaisie("");
  }

  const completeAction = (action) => {
    const newActions = JSON.parse(JSON.stringify(actions));
    const index = newActions.findIndex(a => a.title === action.title);
    const newAction = newActions[index];
    newAction.done = !newAction.done;
    newActions.splice(index, 1, newAction);
    setActions(newActions);
  }

  const deleteAction = (action) => {
    const newActions = JSON.parse(JSON.stringify(actions));
    const index = newActions.findIndex(a => a.title === action.title);
    newActions.splice(index, 1);
    setActions(newActions);
  }

  const setTab = (tab) => {
    setSelectedTab(tab);
  }

    return (
        <View style={styles.conteneur}>
          <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
            <Entete/>
            <Saisie texteSaisie={texteSaisie} evtTexteModifie={(titre) => quandLaSaisieChange(titre)}/>
            <ListeActions actions={actions}
                          filter={selectedTab}
                          completeAction={completeAction}
                          deleteAction={deleteAction}/>
            <BoutonCreer onValider={() => validerNouvelleAction()}/>
          </ScrollView>
          <Menu selected={selectedTab} onSelect={(tab) => setTab(tab)}/>
        </View>
    )
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingTop: 60,
  },
})
