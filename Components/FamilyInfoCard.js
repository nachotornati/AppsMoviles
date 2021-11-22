import { familyInfoCardStyle } from '../Styles/FamilyInfoCardStyle';
import React from 'react';
import { Text, View, Image, StyleSheet,Dimensions,TouchableHighlight} from 'react-native';

const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

export function FamilyInfoCard(props) {
    console.log(props)
    return(
      <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={()=>{ props.navigation.navigate("Family", { id:props.item._id })}}>
      <View style={styles.categoriesItemContainer}>
            <Image style={styles.categoriesPhoto} source={{
          uri: "https://modulo-sanitario-imagenes-db.herokuapp.com/families/image/"+ props.item._id + "/house_front_picture?time=" + new Date(),
          headers: { Authorization: props.token }}} />
          <View style={styles.categoryNameContainer}> 
          <Text style={styles.categoriesName}>{props.item.apellido}</Text>
          </View>
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
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height:240,
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

  infoRecipe: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
    color: '#2cd18a'
  },
  infoDescriptionRecipe: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop:5,
    textAlign:'center'
  },
  infoRecipeName: {
    fontSize: 28,
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  }
});