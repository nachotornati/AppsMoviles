import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, StatusBar, Text, FlatList, TouchableHighlight, Image} from 'react-native';
//Hay que hacer un fetch para traer categoria de fotos y otro para traer datos de la familia
import Gallery from 'react-native-image-gallery';
import ImageView from "react-native-image-viewing";
import { LogBox } from 'react-native';
LogBox.ignoreWarnings = ["Require cycle:", "Warning:"];

export default function ImageScreen({navigation,route}) {
  console.log(route);

    const id = route.params.id
    const category = route.params.category
    const token = route.params.token
    const [visible, setIsVisible] = useState(true);
    console.log("Token recibido", token)

    const images = [
      { uri: "https://modulo-sanitario-imagenes-db.herokuapp.com/families/image/"+ id + "/"+ category + '?time=' + new Date(), headers: { Authorization: token }}
    ]

  /*
    return (
      <Gallery
        style={{ flex: 1, backgroundColor: 'black' }}
        images={[ { source: { uri: "https://modulo-sanitario-imagenes-db.herokuapp.com/families/image/"+ id + "/"+ category + '?time=' + new Date(), headers: { Authorization: token }}}]} />
    );
  */

    return (
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    );
}
