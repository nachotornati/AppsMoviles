import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/*Screens*/
import GoogleLogIn  from './Screens/GoogleLogIn.js';
import FamiliesScreen  from './Screens/FamiliesScreen.js';
import FamilyScreen  from './Screens/FamilyScreen.js';
import MapScreen  from './Screens/MapScreen.js';

/* https://reactnavigation.org/docs/native-stack-navigator/ */

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Iniciar Sesion" component={GoogleLogIn} options={{headerShown: false}} />
        <Stack.Screen name="Families" component={FamiliesScreen} options={{ title: 'Familias' }} />
        <Stack.Screen name="Family" component={FamilyScreen} options={{ title: 'Familia' }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Mapa' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
