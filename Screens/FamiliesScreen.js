import { FamilyInfoCard } from '../Components/FamilyInfoCard';
import React, { useEffect, useState ,useLayoutEffect} from 'react';
import { Button, View, StyleSheet, StatusBar, Text, FlatList, TouchableHighlight, Image} from 'react-native';
import { Dimensions } from 'react-native';
import Background from '../Components/Background';
import asyncStorageHelper from '../Helpers/asyncStorageHelper'


const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

export default function FamiliesScreen ({ navigation }) {
  const [ usuarios, setUsuarios ] = useState();
  const [token, setToken] = useState();

  useEffect( () => {
    console.log('useEffect')
    obtenerDatos()
  }, [])

  

  const obtenerDatos = async () => {
    jwt = await asyncStorageHelper.obtenerToken()
    console.log(jwt)
    https_options = { 
      method: 'get', 
      headers: new Headers({
        'Authorization': jwt
      })
    }

    const data = await fetch("http://modulo-backoffice.herokuapp.com/families/obtain-families", https_options)
    const users = await data.json()
    setUsuarios(users.results)
    setToken(jwt)
  }

  const onPressFamily = (item) => {
    navigation.navigate("Family", { id:item._id });
  };

  const renderRecipes = ({ item }) => (
    
      <FamilyInfoCard navigation={navigation} item={item} token={token}></FamilyInfoCard>
    
  );

  return (
    <View>
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