import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, StatusBar, Text, FlatList, TouchableHighlight, Image, Alert} from 'react-native';
import PhotoMap from '../Components/PhotoMap';
import { LogBox } from 'react-native';
//LogBox.ignoreAllLogs();

export default function MapScreen ({navigation,route}){

    const id  = route.params;
  
    const [ latitude, setLatitude ] = useState(0);
    const [ longitude, setLongitude ] = useState(0);
  
    const obtenerDatos = async () => {
      const data = await fetch("https://modulo-sanitario-imagenes-db.herokuapp.com/families/"+id+"/coordinate")
      const response = await data.json()

      if (response.error.flag){
          Alert.alert(response.error.message.spanish)
          navigation.goBack()
      }
      else{

      setLatitude(response.coordinate.latitude)
      setLongitude(response.coordinate.longitude)
      console.log("https://modulo-sanitario-imagenes-db.herokuapp.com/families/"+id+"/coordinate")
      
      }
    }
  
    useEffect( () => {
      obtenerDatos()
    },[])
  
    return(
      <View>
        <PhotoMap latitude={latitude} longitude={longitude}></PhotoMap>
      </View>
    );
}