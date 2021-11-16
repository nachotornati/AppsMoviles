import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, StatusBar, Text, FlatList, TouchableHighlight, Image} from 'react-native';

import PhotoMap from '../Components/PhotoMap';

export default function MapScreen ({navigation,route}){

    const { id } = route.params;
  
    const [ latitude, setLatitude ] = useState(0);
    const [ longitude, setLongitude ] = useState(0);
    
      
  
  
  
    const obtenerDatos = async () => {
      const data = await fetch("https://modulo-sanitario-imagenes-db.herokuapp.com/families/61848ce34b6dd700161057cb")
      const response = await data.json()
      setLatitude(response.coordinate.latitude)
      setLongitude(response.coordinate.longitude)
      //console.log(information)
      
      
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