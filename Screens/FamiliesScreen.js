import { FamilyInfoCard } from '../Components/FamilyInfoCard';
import React, { useEffect, useState ,useLayoutEffect} from 'react';
import { Button, View, StyleSheet, StatusBar, Text, FlatList, TouchableHighlight, Image} from 'react-native';
import { Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

export default function FamiliesScreen ({ navigation }) {
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

  const onPressFamily = (item) => {
    navigation.navigate("Family", { id:item._id });
  };

  const renderFamilies = ({ item }) => (
    <TouchableHighlight style={{flex:1}} underlayColor='#85C1E9' onPress={() => onPressFamily(item)}>
      <View style={styles.container}>
        <FamilyInfoCard item= {item} />
      </View>
    </TouchableHighlight>
   // ({item}) => <TouchableHighlight onPress={() => navigation.navigate('Family',{id:item._id})}><FamilyInfoCard item={item}/></TouchableHighlight>
  );

  return (
    //<FlatList keyExtractor={(item) => item._id} data={usuarios} renderItem={ ({item}) => <TouchableHighlight onPress={() => navigation.navigate('Family', {id: item._id})}><FamilyInfoCard item={item}/></TouchableHighlight>} />
    <View style={styles.container_style}>
      
      <FlatList  vertical showsVerticalScrollIndicator={false} numColumns={2} keyExtractor={(item) => item._id} data={usuarios} renderItem={renderFamilies } />
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
    borderRadius: 15
  }


});