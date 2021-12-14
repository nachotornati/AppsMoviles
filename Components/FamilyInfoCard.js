import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, LogBox } from 'react-native';

export function FamilyInfoCard(props) {
  return (
    <TouchableHighlight underlayColor="rgba(37, 150, 190,0.2)" onPress={() => { props.navigation.navigate("Family", { id: props.item._id }) }}>
      <View style={styles.categoriesItemContainer}>
        <Text style={styles.categoriesName}>Familia {props.item.apellido}</Text>
        <Text style={styles.categoriesName}>Barrio: {props.item.encuestaUno.direccion.barrio}</Text>
        <Text style={styles.categoriesName}>Partido: {props.item.encuestaUno.direccion.partido}</Text>
        <Text style={styles.categoriesName}>Provincia: {props.item.encuestaUno.direccion.provincia}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  categoriesItemContainer: {
    marginHorizontal: 40,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
    backgroundColor: 'white',

  },
  categoriesName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 7,
    marginLeft: 5,
    color: '#333333',
    justifyContent: 'space-around'

  },
});