import { FamilyInfoCard } from '../Components/FamilyInfoCard';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Modal, Pressable, KeyboardAvoidingView, ActivityIndicator, Animated, PanResponder } from 'react-native';
import { Dimensions } from 'react-native';
import asyncStorageHelper from '../Helpers/asyncStorageHelper'
import { TextInput, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

const { width, height } = Dimensions.get('window');

export default function FamiliesScreen({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [token, setToken] = useState();
  const [apellido, setApellido] = useState('');
  const [barrio, setBarrio] = useState('');
  const [loading, setLoading] = useState(true);
  const [apellidoHolder, setApellidoHolder] = useState('');
  const [barrioHolder, setBarrioHolder] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [pageNum, setpageNum] = useState(1);
  const [currentPage, setCurrentPage] = useState(1)
  const [isFetching, setIsFetching] = useState(false)
  const [shouldClean, setShouldClean] = useState(true)
  const [panResponder, setPanResponder] = useState(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderEnd: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => true,
    onPanResponderRelease: (e, gesto) => true,
    onPanResponderMove: (e, gesto) => {
      if (gesto.dy >= 90) {
        setModalVisible(false);
      }
    }
  }));

  useEffect(() => {
    console.log('useEffect')
    obtenerDatos()
  }, [apellido, barrio, currentPage])


  navigation.setOptions({
    headerRight: () => {
      return (<Icon size={30} onPress={() => { setModalVisible(true) }} name='filter' />)
    },
    headerLeft: () => {
      return (<Icon size={30} style={{ marginRight: 20 }} onPress={() => { asyncStorageHelper.limpiarToken(); GoogleSignin.signOut(); navigation.goBack() }} name='door-open' />)
    },
  })

  const obtenerDatos = async () => {
    setIsFetching(true)

    jwt = await asyncStorageHelper.obtenerToken()
    https_options = {
      method: 'get',
      headers: new Headers({
        'Authorization': jwt
      })
    }

    let url = "http://modulo-backoffice.herokuapp.com/families/obtain-families?limit=4&page=" + currentPage

    if (apellido) {
      url += "&apellido=" + apellido
    }

    if (barrio) {
      url += "&barrio=" + barrio
    }

    console.log(url)
    const data = await fetch(url, https_options)
    const users = await data.json()

    console.log("Usuarios Obtenidos:", users.results)

    if (shouldClean) {
      console.log("Se limpia usuarios...")
      setUsuarios(users.results)
      setShouldClean(false)
    }
    else if (users.length != 0) {
      let newUsers = [...usuarios, ...users.results]
      let uniqueUsers = newUsers.filter((v, i, a) => a.findIndex(t => (t._id === v._id)) === i)
      console.log("Usuarios que se muestran:", uniqueUsers)
      setUsuarios(uniqueUsers)
    }

    setToken(jwt)
    setLoading(false)
    setIsFetching(false)
  }

  const renderFamily = ({ item }) => (
    <FamilyInfoCard navigation={navigation} item={item} token={token}></FamilyInfoCard>
  );

  const fetchMoreFamilies = async () => {
    setCurrentPage(currentPage + 1)
  }

  return (
    <View>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible); }}>
        <Animated.View style={{ justifyContent: "center", alignItems: "center" }} {...panResponder.panHandlers}>
          <View style={styles2.centeredView}>
            <KeyboardAvoidingView style={styles2.modalView}>
              <Icon size={30} name="window-minimize" style={{ marginBottom: 200, textAlign: "center" }} onPress={() => { setModalVisible(false) }} />
              <Title style={{ marginBottom: 15 }}>Filtros</Title>
              <TextInput style={styles2.textInput} type="text" onChangeText={(text) => setApellidoHolder(text)} value={apellidoHolder} placeholder={"Ingrese un apellido..."} />
              <TextInput style={styles2.textInput} type="text" onChangeText={(text) => setBarrioHolder(text)} value={barrioHolder} placeholder={"Ingrese un barrio..."} />
              <Pressable style={[styles2.button, styles2.buttonClose]} onPress={() => {
                setShouldClean(true)
                setApellido(apellidoHolder)
                setBarrio(barrioHolder)
                setCurrentPage(1)
                setModalVisible(!modalVisible)
                setUsuarios([]);
              }}>
                <Text style={styles2.textStyle}>Filtrar</Text>
              </Pressable>
              <Pressable style={[styles2.buttonBorrar, styles2.buttonClose]} onPress={() => {
                setShouldClean(true)
                setBarrioHolder('')
                setApellidoHolder('')
                setApellido('')
                setBarrio('')
                setCurrentPage(1)
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
          visible={loading}
          textContent={'Loading...'}
          size="large" color="#0000ff"
          style={{
            height: height - 50,
            width: width,
          }}
        />
      ) : (

        <FlatList
          refreshing={isFetching}
          data={usuarios}
          ListEmptyComponent={
            <View style={{
              height: height,
              width: width,
              backgroundColor: "transparent",
              alignItems: "center"
            }}>
              <Icon name="exclamation-circle" size={100} style={{ marginTop: 250 }} color="#A00" />
              <Text style={{
                textAlign: "center",
                marginTop: 20
              }}>No hay familias que coincidan con los parametros de búsqueda</Text>
            </View>
          }
          renderItem={renderFamily}
          onEndReached={fetchMoreFamilies}
          onEndReachedThreshold={0.5}
          keyExtractor={(item) => item._id.toString()}
        />
      )}

    </View>
  );
};

const styles2 = StyleSheet.create({
  buttonBorrar: {
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textInput: {
    height: 50,
    width: 300,
    marginBottom: 25,
    backgroundColor: "white"
  },
  centeredView: {
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
    width: width,
    height: height,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
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
});
