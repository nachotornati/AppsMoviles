import { FamilyInfoCard } from '../Components/FamilyInfoCard';
import React, { useEffect, useState ,useLayoutEffect} from 'react';
import { Button, View, StyleSheet, StatusBar, Text, FlatList, TouchableHighlight, Image, Modal, Pressable, Alert, RefreshControlBase} from 'react-native';
import { Dimensions } from 'react-native';
import Background from '../Components/Background';
import asyncStorageHelper from '../Helpers/asyncStorageHelper'
import { SearchBar } from 'react-native-elements';
import { TextInput } from 'react-native-paper';


const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

export default function FamiliesScreen ({ navigation }) {
  const [ usuarios, setUsuarios ] = useState();
  const [token, setToken] = useState();
  const [apellido, setApellido] = useState('');
  const [barrio, setBarrio] = useState('');
  const [apellidoHolder, setApellidoHolder] = useState('');
  const [barrioHolder, setBarrioHolder] = useState('');
  const [modalVisible, setModalVisible] = useState(false);


  useEffect( () => {
    console.log('useEffect')
    obtenerDatos()
  }, [])


  navigation.setOptions({
    headerRight: () => {
      return ( <Image style={{width: 30, height: 30}} source={{uri: '../assets/filter.png'}}></Image>)
    },
    headerRight: () => (<View>
      <Text onPress={() => setModalVisible(true)}>Filtrar</Text>
      <Text>Cerrar Sesión</Text></View>),
  });

  const obtenerDatos = async () => {
    jwt = await asyncStorageHelper.obtenerToken()
    //console.log(jwt)
    https_options = { 
      method: 'get', 
      headers: new Headers({
        'Authorization': jwt
      })
    }
    url = "http://modulo-backoffice.herokuapp.com/families/obtain-families"

    if(apellido){
      url += "?apellido="+apellidoHolder
    }
    
    if(barrio){
      url += "?barrio="+barrioHolder
    }

    console.log(url)
    const data = await fetch(url, https_options)
    const users = await data.json()
    setUsuarios(users.results)
    setToken(jwt)
  }

  /*
  const onPressFamily = (item) => {
    navigation.navigate("Family", { id:item._id });
  };*/

  const renderRecipes = ({ item }) => (
      <FamilyInfoCard navigation={navigation} item={item} token={token}></FamilyInfoCard>
  );

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {Alert.alert("Modal has been closed."); setModalVisible(!modalVisible);}}>
        <View style={styles2.centeredView}>
          <View style={styles2.modalView}>
            <Text style={styles2.modalText}>Filtros</Text>
            <TextInput style={styles2.textInput} type="text" onChangeText={(text) => setApellidoHolder(text)} value={apellidoHolder} placeholder={"Ingrese un apellido..."} />
            <TextInput style={styles2.textInput} type="text" onChangeText={(text) => setBarrioHolder(text)} value={barrioHolder} placeholder={"Ingrese un barrio..."} />
            <Pressable style={[styles2.button, styles2.buttonClose]} onPress={() => {setModalVisible(!modalVisible)}}>
              <Text style={styles2.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <FlatList data={usuarios} renderItem={renderRecipes} keyExtractor={(item) => item._id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 20,
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 75,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15,
    backgroundColor:'white'
  },
  photo: {
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  },
  category: {
    marginTop: 5,
    marginBottom: 5
  }
});

const styles2 = StyleSheet.create({
  textInput: {
    height:50,
    width:200,
    marginBottom: 25,
    backgroundColor: "white"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    width:300,
    height:300,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    width: 185
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
