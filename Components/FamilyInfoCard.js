import { familyInfoCardStyle } from '../Styles/FamilyInfoCardStyle';
import React from 'react';
import { Text, View, Image, StyleSheet,Dimensions,TouchableHighlight, LogBox } from 'react-native';

/*
LogBox.ignoreWarnings(["Require cycle:"]);
*/

const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

export function FamilyInfoCard(props) {
    return(
      <TouchableHighlight underlayColor="rgba(37, 150, 190,0.2)" onPress={()=>{ props.navigation.navigate("Family", { id:props.item._id })}}>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  categoriesItemContainer: {
    marginHorizontal: 40,
    marginVertical:10,
    justifyContent: 'center',
    alignItems: 'center',
    height:200,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
    backgroundColor:'white',
  
  },
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
  },
  categoriesName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:7,
    marginLeft:5,
    color: '#333333',
    justifyContent:'space-around'
    
  },
  categoryNameContainer:{
    flex:1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginTop: 8,
    flexDirection:'row',
    padding:10
    
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

  infoFamily: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  family: {
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