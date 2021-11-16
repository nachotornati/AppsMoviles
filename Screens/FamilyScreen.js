import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, StatusBar, Text, FlatList, TouchableHighlight, Image} from 'react-native';
import PictureAdder from '../Components/pictureAdder';
//Hay que hacer un fetch para traer categoria de fotos y otro para traer datos de la familia

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


    /*const onPressCategory = (item) => {
      //agregar Id
      const title = item.name;
      const category = item;
      navigation.navigate("ImageList", { category, title });
    };
    
    //<Text style={styles.categoriesInfo}>{getNumberOfPhotos(item.id)} photos</Text>
    const renderCategory = ({ item }) => (
      <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressCategory(item)}>
        <View style={styles.categoriesItemContainer}>
          <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} />
          <Text style={styles.categoriesName}>{item.name}</Text>
          
        </View>
      </TouchableHighlight>
    );
  
    return (
      <View>
        <FlatList data={categories} renderItem={renderCategory} keyExtractor={(item) => `${item.id}`} />
      </View>
    );*/
  
  }