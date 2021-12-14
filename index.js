import App from './App.js';
import { AppRegistry, LogBox } from 'react-native'
import { name as appName } from './app.json'

LogBox.ignoreAllLogs();

AppRegistry.registerComponent('main', () => App)
