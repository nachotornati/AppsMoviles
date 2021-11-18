import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, StatusBar, Text, FlatList, TouchableHighlight, Image, Alert, SafeAreaView} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FamilyInfoCard } from '../Components/FamilyInfoCard';
import ViewLocationButton from '../Components/ViewLocationButton';
//Hay que hacer un fetch para traer categoria de fotos y otro para traer datos de la familia

export default function FamilyScreen({ navigation, route }) {
    const [ information, setInformation ] = useState({});
    const [ categories, setCategories ] = useState({});
    const  id  = route.params.id;
    console.log("MOSTRAR ID",id)
    const obtenerDatos = async () => {
      const data = await fetch("http://modulo-backoffice.herokuapp.com/families/x-test-obtain-resumed-family/"+ id)
      //const data2= await fetch()
      const dataCategories = await fetch("https://modulo-sanitario-imagenes-db.herokuapp.com/families/image/categories")
      const response = await data.json()
      const responseCategories = await dataCategories.json()
      console.log("MOSTRANDO RESPONSE",response)
      setInformation(response)
      
      setCategories(responseCategories)
      console.log(categories)
    }
    console.log(information)
    useEffect( () => {
      obtenerDatos()
    }, [navigation])
  
    /*return (
      // Cambiar con fotos <FlatList keyExtractor={(item) => item._id} data={usuarios} renderItem={ ({item}) => <TouchableHighlight onPress={() => navigation.navigate('Map',item._id)}><FamilyInfoCard item={item}/></TouchableHighlight>} />
      <View>
        <Text>Aca van las fotos de la familia {id}</Text>
        <TouchableHighlight onPress={()=>{navigation.navigate('Map',id)}}>
        <Image source={{uri: 'https://drive.google.com/thumbnail?id=1bDYTk5uvJTE3_bvTQ1TjnzmhZ3Va0Xib'}} alt={"Doesn't work"}
         style={{width: 400, height: 400}} />
        </TouchableHighlight>
         
         <PictureAdder familyid={id} category='bathroom_picture'></PictureAdder>
      </View>
    );*/


    const onPressCategory = () => {
      //agregar Id
      //const category = item.name;
      navigation.navigate("Image", { navigation, route });
      //Alert.alert("Hola")

    };
    
    //<Text style={styles.categoriesInfo}>{getNumberOfPhotos(item.id)} photos</Text>
    const renderCategory = ({ item }) => (
      
      <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressCategory()}>
        <View style={styles.categoriesItemContainer}>
          <Image style={styles.categoriesPhoto} source={{ uri: "https://modulo-sanitario-imagenes-db.herokuapp.com/families/image/"+ id + "/"+ item.path}} />
          <Text style={styles.categoriesName}>{item.name.spanish}</Text>
          
        </View>
      </TouchableHighlight>
    );
  
    return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList ListHeaderComponent={<ViewLocationButton onPress={()=>{navigation.navigate('Map',id)}}/>} data={categories.categories} renderItem={renderCategory} keyExtractor={(item) => item.name. spanish} />
    </SafeAreaView>
    );
  
  }

  const styles = StyleSheet.create({
    categoriesItemContainer: {
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      height: 215,
      borderColor: '#cccccc',
      borderWidth: 0.5,
      borderRadius: 20,
    },
    categoriesPhoto: {
      width: '100%',
      height: 155,
      borderRadius: 20,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      shadowColor: 'blue',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 1.0,
      elevation: 3,
    },
    categoriesName: {
      flex: 1,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333333',
      marginTop: 8
    },
    categoriesInfo: {
      marginTop: 3,
      marginBottom: 5
    },
    container: {
      backgroundColor: 'white',
      flex: 1
    },
    buttonContainer: {
     
      flexDirection: 'row',
      alignSelf: 'stretch',
      

    },
    infoRecipeName: {
      fontSize: 28,
      margin: 10,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
      
    },
    
  });