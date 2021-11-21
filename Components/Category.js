import React,{Component} from "react";
import { render } from "react-dom";
import{Platform, StyleSheet,Text,View, TouchableHighlight, Image} from "react-native";
import AppButton from "./AppButton";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import asyncStorageHelper from '../Helpers/asyncStorageHelper'
import ImageView from "react-native-image-viewing";


export default class Category extends Component{
    constructor(props){
        super(props);
        this.state={
            id: this.props.id,
            item: this.props.item,
            navigation: this.props.navigation,
            date: new Date(),
            token: this.props.token,
            visible: false
          }
    }

    setIsVisible(boolean){
      this.setState({visible: boolean})
    }


    onPressCategory(id,category, token){
        console.log("id antes ", id);
        console.log("path antes ", category);
        //this.state.navigation.navigate("Image", {id,category, token});
        this.setIsVisible(true)
    }

    openLibrary(){
        const options = {
          mediaType:'photo',
          selectionLimit:1,
        }
  
        launchImageLibrary(options,(res)=>{
          console.log('Subiendo Imagen....');
          console.log(res.uri);
          this.uploadPictureToServer(res.uri);
  
        });
      }

     async uploadPictureToServer(imagePath){ // change url
        console.log('upload method ' + this.state.id + this.state.item.path)
        let url = 'https://modulo-sanitario-imagenes-db.herokuapp.com/families/image/' + this.state.id  + '/' +  this.state.item.path
        console.log('LINK FOTO')
        let body = new FormData();
        body.append('upload', {uri: imagePath,name: 'photo.jpg',filename :'imageTest45.jpg',type: 'image/jpg'});
        fetch(url,{ method: 'POST',headers:{  
          "Content-Type": "multipart/form-data",
          "otherHeader": "foo",
          "Authentication": this.state.token
        } , body :body} )
       .then((res) => { console.log("response " +res) } ) 
       .catch((e) => console.log(e))
       .done();

       setTimeout(()=>{this.setState({date: new Date()})},2000)
  
  
      }


    render(){
        return(
            
        <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => this.onPressCategory(this.state.id,this.state.item.path, this.state.token)}>
        <View style={styles.categoriesItemContainer}>
        <ImageView images={[{
          uri: "https://modulo-sanitario-imagenes-db.herokuapp.com/families/image/"+ this.props.id + "/"+ this.props.item.path + '?time=' + new Date(),
          headers: { Authorization: this.state.token }}]} imageIndex={0} visible={this.state.visible} onRequestClose={() => this.setIsVisible(false)} />
        <Image style={styles.categoriesPhoto} source={{
          uri: "https://modulo-sanitario-imagenes-db.herokuapp.com/families/image/"+ this.props.id + "/"+ this.props.item.path + '?time=' + new Date(),
          headers: { Authorization: this.state.token }}} />
          <View style={styles.categoryNameContainer}> 
          <Text style={styles.categoriesName}>{this.state.item.name.spanish}</Text>
          <AppButton title={'+'} onPress={()=>{ this.openLibrary()}}/>
          </View>
        </View>
      </TouchableHighlight>

        );
    }

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