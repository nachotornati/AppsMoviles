import { FamilyInfoCard } from '../Components/FamilyInfoCard';
import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, Text, FlatList, Modal, Pressable, KeyboardAvoidingView, ActivityIndicator, Animated, PanResponder} from 'react-native';
import { Dimensions } from 'react-native';
import asyncStorageHelper from '../Helpers/asyncStorageHelper'
import { TextInput, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { GoogleSignin} from '@react-native-google-signin/google-signin';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;


export default function FamiliesScreen ({ navigation }) {
  const [ usuarios, setUsuarios ] = useState();
  const [token, setToken] = useState();
  const [apellido, setApellido] = useState('');
  const [barrio, setBarrio] = useState('');
  const [loading, setLoading] = useState(true);
  const [apellidoHolder, setApellidoHolder] = useState('');
  const [barrioHolder, setBarrioHolder] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [pageNum, setpageNum] = useState(1);
  const [pan, setPan] = useState(new Animated.ValueXY());
  const [panResponder, setPanResponder] = useState(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderEnd: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => true,                      
    onPanResponderRelease: (e, gesto) => true,
    onPanResponderMove: (e, gesto) => {
        if(gesto.dy >= 90){
            setTimeout(() => {setModalVisible(false)});
        }
    }                     
}));


  useEffect( () => {
    console.log('useEffect')
    obtenerDatos()
  }, [apellido, barrio])


  navigation.setOptions({
    headerRight: () => {
      return (  <Icon size={30} onPress={() => { setModalVisible(true) }} name='filter' />)
    },
    headerLeft: () => {
      return (  <Icon size={30} style={{marginRight:20}} onPress={() => {asyncStorageHelper.limpiarToken();GoogleSignin.signOut();navigation.goBack()}} name='door-open' />)
    },
  })
  
  /*headerRight: () => (<View>
    <Text onPress={() => setModalVisible(true)}>Filtrar</Text>
    <Text>Cerrar Sesión</Text></View>),*/

  const obtenerDatos = async () => {
    jwt = await asyncStorageHelper.obtenerToken()
    //console.log(jwt)
    https_options = { 
      method: 'get', 
      headers: new Headers({
        'Authorization': jwt
      })
    }

    url = "http://modulo-backoffice.herokuapp.com/families/obtain-families?limit=4&page=" + 1;

    if(apellido){
      url += "apellido="+apellido+"&"
    }
    
    if(barrio){
      url += "barrio="+barrio+"&"
    }

    console.log(url)
    const data = await fetch(url, https_options)
    const users = await data.json()
    setUsuarios(users.results)
    setToken(jwt)
    setLoading(false)
  }

  /*
  const onPressFamily = (item) => {
    navigation.navigate("Family", { id:item._id });
  };*/

  const renderFamily = ({ item }) => (
      <FamilyInfoCard navigation={navigation} item={item} token={token}></FamilyInfoCard>
  );

  const fetchMoreFamilies = async ()=>{
    jwt = await asyncStorageHelper.obtenerToken()
    console.log('ENTRE AL FETCH MORE')
    https_options = { 
      method: 'get', 
      headers: new Headers({
        'Authorization': jwt
      })
    }

    setpageNum(pageNum+1);
    url = "http://modulo-backoffice.herokuapp.com/families/obtain-families?limit=4&page=" + (pageNum)+'&';

    if(apellido){
      url += "apellido="+apellido+"&"
    }
    
    if(barrio){
      url += "barrio="+barrio+"&"
    }


    
    const data = await fetch(url, https_options);
    const users = await data.json();
    if(users.results.length != 0){
      setUsuarios([...usuarios,...users.results])
    }
    
  }

  return (
    <View>
      
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible);}}>
      <Animated.View style = {{ flex: 1, justifyContent: "center", alignItems: "center"}} {...panResponder.panHandlers}>
        <View style={styles2.centeredView}>
          <KeyboardAvoidingView style={styles2.modalView}>
            <Icon size={30} name="window-minimize" style={{marginBottom: 200, textAlign: "center"}} onPress={()=>{setModalVisible(false)}}/>
            <Title style={{marginBottom:15}}>Filtros</Title>
            <TextInput style={styles2.textInput} type="text" onChangeText={(text) => setApellidoHolder(text)} value={apellidoHolder} placeholder={"Ingrese un apellido..."} />
            <TextInput style={styles2.textInput} type="text" onChangeText={(text) => setBarrioHolder(text)} value={barrioHolder} placeholder={"Ingrese un barrio..."} />
            <Pressable style={[styles2.button, styles2.buttonClose]} onPress={() => {
                setApellido(apellidoHolder)
                setBarrio(barrioHolder)
                setModalVisible(!modalVisible)
                setUsuarios([]);
                }}>
              <Text style={styles2.textStyle}>Filtrar</Text>
            </Pressable>
            <Pressable style={[styles2.buttonBorrar, styles2.buttonClose]} onPress={() => {
                setBarrioHolder('')
                setApellidoHolder('')
                setApellido('')
                setBarrio('')
                setModalVisible(!modalVisible)
                }}>
              <Text style={styles2.textStyle}>Borrar</Text>
            </Pressable>
          </KeyboardAvoidingView>
        </View>
        </Animated.View>
      </Modal>


      {loading ? (
          <ActivityIndicator
            //visibility of Overlay Loading Spinner
            visible={loading}
            //Text with the Spinner
            textContent={'Loading...'}
            //Text style of the Spinner Text
            size="large" color="#0000ff"
            style={{
              height:height-50,
              width:width,
            }}
          />
        ) : (

          <FlatList data={usuarios} ListEmptyComponent={
      
      
            <View style={{
              height: height,
              width: width,
              backgroundColor:"transparent",
              alignItems: "center"
            }}>
              <Icon name="exclamation-circle" size={100} style={{marginTop:250}} color="#A00"/>
              <Text style={{
                textAlign: "center",
                marginTop: 20
              }}>No hay familias que coincidan con los parametros de búsqueda</Text>
            </View>
          
          
          } renderItem={renderFamily} keyExtractor={(item) => item._id} onEndReached={fetchMoreFamilies} onEndReachedThreshold={0.15}/>

        )}

    </View>
  );
};

const styles = StyleSheet.create({
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
  buttonBorrar:{
    marginTop:10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
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
    width:width,
    height:height,
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
    marginBottom: 200,
    textAlign: "center"
  }
});
