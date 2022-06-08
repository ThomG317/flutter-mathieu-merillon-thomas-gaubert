import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ListerVoyages } from "./ListerVoyages";
import { AjouterVoyage } from "./AjouterVoyage";

export const Tab = createBottomTabNavigator();

export function MyTabs({voyages, onAddVoyage}) {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="ListerV">
                    {props => <ListerVoyages {...props} voyages={voyages}/>}
                </Tab.Screen>
                <Tab.Screen name="AjouterV">
                    {props => <AjouterVoyage {...props} onAddVoyage={onAddVoyage}/>}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
