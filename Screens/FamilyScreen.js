import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, StatusBar, Text, FlatList, TouchableHighlight, Image} from 'react-native';
import PictureAdder from '../Components/pictureAdder';


export default function FamilyScreen({ navigation, route }) {
    const [ information, setInformation ] = useState();
    const { id } = route.params;
  
    const obtenerDatos = async () => {
      const data = await fetch("http://modulo-backoffice.herokuapp.com/families/x-test-obtain-resumed-family/"+ id)
      const response = await data.json()
      setInformation(response)
    }
  
    useEffect( () => {
      obtenerDatos()
    }, [navigation])
  
    return (
      // Cambiar con fotos <FlatList keyExtractor={(item) => item._id} data={usuarios} renderItem={ ({item}) => <TouchableHighlight onPress={() => navigation.navigate('Map',item._id)}><FamilyInfoCard item={item}/></TouchableHighlight>} />
      <View>
        <Text>Aca van las fotos de la familia {id}</Text>
        <TouchableHighlight onPress={()=>{navigation.navigate('Map',id)}}>
        <Image source={{uri: 'https://drive.google.com/thumbnail?id=1bDYTk5uvJTE3_bvTQ1TjnzmhZ3Va0Xib'}} alt={"Doesn't work"}
         style={{width: 400, height: 400}} />
        </TouchableHighlight>
         
         <PictureAdder familyid={id} category='bathroom_picture'></PictureAdder>
      </View>
    );
  
  }