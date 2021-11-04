import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , FlatList, TouchableHighlight} from 'react-native';
import { FamilyInfoCard } from '../Components/FamilyInfoCard';

export default function FamiliesScreen ({navigation}) {

  const [ usuarios, setUsuarios ] = useState();

  useEffect( () => {
    console.log('useEffect')
    obtenerDatos()
  }, [])

  const obtenerDatos = async () => {
    const data = await fetch("http://modulo-backoffice.herokuapp.com/families/x-test-obtain-families")
    const users = await data.json()
    setUsuarios(users.results)
  }

  return (
    <View style={styles.container_style}>
      <Text style={styles.header}>Familias</Text> 
      <FlatList keyExtractor={(item) => item._id} data={usuarios} renderItem={ ({item}) => <TouchableHighlight onPress={() => alert(item._id)}><FamilyInfoCard item={item}/></TouchableHighlight>} />
    </View>
  );
};

const styles = StyleSheet.create({
  container_style: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  }, header: {
    textAlign: 'center',
    backgroundColor: '#222c3c',
    padding: 20,
    fontSize: 20,
    color: 'white'
  }
});
