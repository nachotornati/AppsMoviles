import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, StatusBar, Dimensions, Text, FlatList, TouchableHighlight, Image, Alert, SafeAreaView, ActivityIndicator} from 'react-native';
import { Modal } from 'react-native-paper';
import AppButton from '../Components/AppButton';
import { FamilyInfoCard } from '../Components/FamilyInfoCard';
import asyncStorageHelper from '../Helpers/asyncStorageHelper';
import Category from '../Components/Category';
import Icon from 'react-native-vector-icons/AntDesign';
import { LogBox } from 'react-native';
//LogBox.ignoreAllLogs();

//Hay que hacer un fetch para traer categoria de fotos y otro para traer datos de la familia
const { width, height } = Dimensions.get('window');

/*
Cada screen tiene como parametro navigation y route. route contiene información
acerca de la ruta actual (en que jerarquia nos desplazamos antes de llegar aca).
De aca podemos sacar los parametros que usamos en navigation.navigate('Twitter', 
{unObjetoConCosas}). Ese {unObjetoConCosas} es lo que recibimos en route.params.

navigations simplemente contiene funciones.

*/


export default function FamilyScreen({ navigation, route }) {
    const [ information, setInformation ] = useState({});
    const [ categories, setCategories ] = useState({});
    const [ token, setToken ] = useState('');
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(0);
    const  id  = route.params.id;

    navigation.setOptions({
      headerRight: () => {
        return (  <Icon size={30} onPress={() => { setModalVisible(true) }} name='reload1' onPress={ () => {setRefresh(refresh+1)} } />)
      }
    })

    const obtenerDatos = async () => {
      jwt = await asyncStorageHelper.obtenerToken()
      setToken(jwt)

      https_options_back = { 
        method: 'get', 
        headers: { 'Authorization': jwt }
      }

      const data = await fetch("http://modulo-backoffice.herokuapp.com/families/obtain-resumed-family/"+ id, https_options_back)
      const dataCategories = await fetch("https://modulo-sanitario-imagenes-db.herokuapp.com/families/image/ordered/categories/"+id, https_options_back)

      const response = await data.json()
      const responseCategories = await dataCategories.json()

      setInformation(response)
      responseCategories.categories.sort((A,B)=>{ return !A.flag })
      setCategories(responseCategories)
      setLoading(false)
      
    }

    useEffect( () => {
      obtenerDatos()
    }, [navigation, refresh])

    
    //<Text style={styles.categoriesInfo}>{getNumberOfPhotos(item.id)} photos</Text>
    const renderCategory = ({ item }) => (
      <Category navigation={navigation} id={id} item={item} token={token} ></Category>
    );

    return (
      
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
          <ActivityIndicator
            size="large" color="#0000ff"
            //visibility of Overlay Loading Spinner
            visible={loading}
            //Text with the Spinner
            textContent={'Loading...'}
            //Text style of the Spinner Text
            style={{
              height:height-50,
              width:width,
            }}


          />
        ) : (

          <FlatList ListHeaderComponent={
              
            <View style={styles.familyInfoContainer}>
            <Text style={styles.infoFamilyName} >{'Familia ' + information.apellido}</Text>
              <View style={{marginBottom:10}}>
                <Text style={styles.infoDescriptionFamily} >{information.estado}</Text>
              </View>
            <AppButton title={'Ver mapa'} onPress={()=>{navigation.navigate('Map',id)}}/>
    
          </View>
    } data={categories.categories} renderItem={renderCategory} keyExtractor={(item) => item.name. spanish} />

        )}

      
    </SafeAreaView>
    );
  
  }

/*

Voy a hacer una mencion a Flex.

flex define como los items van a llenar el espacio disponible. Cada espacio va a ser
dividido en función de la propiedad flex de cada propiedad. Por ejemplo:

<View style={[styles.container, { flexDirection: "row"}]}>
  <View style={{ flex: 2, backgroundColor: "red" }} />
  <View style={{ flex: 2, backgroundColor: "darkorange" }} />
  <View style={{ flex: 4, backgroundColor: "green" }} />
</View>

Aca, todos los view adentro del primero, se van a colocar en fila ocupando el mismo ancho red y darkorange
mientras que el verde va a ocupar un poco mas.

*/

const styles = StyleSheet.create({
  familyInfoContainer:{
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 230,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
    backgroundColor:'white'
  },
  categoriesInfo: {
    marginTop: 3,
    marginBottom: 5
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
    color: '#2cd18a'
  },
  infoDescriptionFamily: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop:5,
    textAlign:'center'
  },
  infoFamilyName: {
    fontSize: 28,
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  }
});
