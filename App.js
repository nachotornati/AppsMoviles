import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/*Screens*/
import GoogleLogIn  from './Screens/GoogleLogIn.js';
import FamiliesScreen  from './Screens/FamiliesScreen.js';
import FamilyScreen  from './Screens/FamilyScreen.js';
import MapScreen  from './Screens/MapScreen.js';

/* https://reactnavigation.org/docs/native-stack-navigator/ */

/*

Aca tenemos 5 screens (Iniciar Sesion, Families, Family, Image y Map)
definidas por el componente Stack.Screen. Cada screen toma un componente
como prop. Todos esos componentes reciben una prop que se llama navigation
que tiene varios metodos para poder "linkearse" con otras screens. Por ejemplo,
podes usar navigation.navigate para ir a la screen Profile, por decir algo.

El navigator mas usado es createNativeStackNavigator
*/

const Stack = createNativeStackNavigator();

/*

Devuelve dos cosas: un Screen y un Navigator. Ambos se usan para configurar
el Navigator. El Navigator tiene que contener elementos Screen como sus hijos
para definir la configuracion para las rutas.


A cada screen podemos asignarle opciones (options es la prop para esto).
Usualmente, se suele dar la misma configuracion para todas las screens y
para eso  le podemos pasar la prop screenOptions al Navigator.

*/

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Iniciar Sesion" options={{headerShown: false}} component={GoogleLogIn} />
      <Stack.Screen name="Families" component={FamiliesScreen} options={{ title: 'Familias' }} />
      <Stack.Screen name="Family" component={FamilyScreen} options={{ title: 'Familia' }} />
      <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Mapa' }} />
    </Stack.Navigator>
  );
}

//El Stack.Navigator adentro de NavigationContainer que es el responsable de manejar el estado de la app.
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
