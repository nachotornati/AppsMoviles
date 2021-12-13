import App from './App.js';
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'

AppRegistry.registerComponent('main', () => App)

/* 

AppRegistry es el punto de entrada para correr
todas las aplicaciones de React Native.

Los componentes raices de la aplicacion se tienen
que registrar ellos mismos con AppRegistry.registerComponent
Le pasamos la AppKey y el component provider.

Cuando usamos AppRegistry.registerComponent estamos creando
un puente entre Javascript y Native.

*/