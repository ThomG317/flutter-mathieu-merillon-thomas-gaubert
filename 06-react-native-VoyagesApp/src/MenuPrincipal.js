import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Voyage } from "./ListerVoyages";
import { AjouterVoyage } from "./AjouterVoyage";

export const Tab = createBottomTabNavigator();

export function MyTabs({voyages, onAddVoyage, onAddLieu}) {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="ListerV">
                    {props => <Voyage {...props} voyages={voyages} onAddLieu={onAddLieu}/>}
                </Tab.Screen>
                <Tab.Screen name="AjouterV">
                    {props => <AjouterVoyage {...props} onAddVoyage={onAddVoyage}/>}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
