import { FamilyInfoCard } from '../Components/FamilyInfoCard';
import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, StatusBar, Text, FlatList, TouchableHighlight, Image} from 'react-native';

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
    //<FlatList keyExtractor={(item) => item._id} data={usuarios} renderItem={ ({item}) => <TouchableHighlight onPress={() => navigation.navigate('Family', {id: item._id})}><FamilyInfoCard item={item}/></TouchableHighlight>} />
    <View style={styles.container_style}>
      
      <FlatList keyExtractor={(item) => item._id} data={usuarios} renderItem={ ({item}) => <TouchableHighlight onPress={() => navigation.navigate('Family',{id:item._id})}><FamilyInfoCard item={item}/></TouchableHighlight>} />
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