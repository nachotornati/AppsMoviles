import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, StatusBar, Text, FlatList, TouchableHighlight, Image} from 'react-native';
import PictureAdder from '../Components/PictureAdder';
//Hay que hacer un fetch para traer categoria de fotos y otro para traer datos de la familia
import Gallery from 'react-native-image-gallery';


export default function ImageScreen({navigation,route}) {
  console.log(route);

    const id = route.params.id
    const category = route.params.category

  
    return (
      <Gallery
        style={{ flex: 1, backgroundColor: 'black' }}
        images={[
          { source: { uri: "https://modulo-sanitario-imagenes-db.herokuapp.com/families/image/"+ id + "/"+ category + '?time=' + new Date()} }
        ]}
      />
    );
 }