import React,{Component} from "react";
import{Platform, StyleSheet,Text,View, TouchableHighlight, Image, Alert} from "react-native";
import AppButton from "./AppButton";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Button} from 'react-native-paper'
import ImageView from "react-native-image-viewing";
import CategoryButton from '../Components/CategoryButton';


export default class Category extends Component{
    constructor(props){
        super(props);
        var fecha = new Date()
        this.state={
            id: this.props.id,
            item: this.props.item,
            navigation: this.props.navigation,
            imgUri: "https://modulo-sanitario-imagenes-db.herokuapp.com/families/image/"+ this.props.id + "/"+ this.props.item.path,
            imgPath: "https://modulo-sanitario-imagenes-db.herokuapp.com/families/image/"+ this.props.id + "/"+ this.props.item.path + '?time=' + fecha,
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

      openCamera(){
        const options = {
          mediaType:'photo',
          selectionLimit:1,
        }
  
        launchCamera(options,(res)=>{
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

       let newImagePath = this.state.imgUri + '?time=' + new Date()

       setTimeout(()=>{this.setState({imgPath: newImagePath})},2000)
       console.log('nuevo path >>>>>>> ',this.state.itemPath)
  
  
      }

    showConfirmDialog = () => {
        return Alert.alert(
          "Eliminar imagen",
          "¿Estas seguro que deseas eliminar esta imagen?",
          [
            // The "Yes" button
            {
              text: "Si",
              onPress: () => {
                this.deletePicture();
              },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
              text: "No",
            },
          ]
        );
      };

    deletePicture(){
      let url = 'https://modulo-sanitario-imagenes-db.herokuapp.com/families/image/' + this.state.id  + '/' +  this.state.item.path
      var requestOptions = {
        method: 'DELETE',
        redirect: 'follow',
        headers: {
          Authorization: this.state.token
        }
      };
      
      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      let newImagePath = this.state.imgUri + '?time=' + new Date()
       setTimeout(()=>{this.setState({imgPath: newImagePath})},2000)
    }


    render(){
        return(
            
        <TouchableHighlight underlayColor="rgba(37, 150, 190,0.2)" onPress={() => this.onPressCategory(this.state.id,this.state.item.path, this.state.token)}>
        <View style={styles.categoriesItemContainer}>
        <ImageView images={[{
          uri: this.state.imgPath,
          headers: { Authorization: this.state.token }}]} imageIndex={0} visible={this.state.visible} onRequestClose={() => this.setIsVisible(false)} />
        <Image style={styles.categoriesPhoto} source={{
          uri: this.state.imgPath,
          headers: { Authorization: this.state.token }}} />
          <View style={styles.categoryNameContainer}>
          <CategoryButton uri={'upload'} onPress={()=>{ this.openLibrary()}}/>
          <CategoryButton uri={'camerao'} onPress={()=>{ this.openCamera()}}/>
          <CategoryButton uri={'delete'} onPress={()=>{ this.showConfirmDialog()}}/>
          </View>
                  <Text style={styles.categoriesName}>{this.state.item.name.spanish}</Text>
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
      height:300,
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
 
    infoCategory: {
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
    infoDescriptionCategory: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 16,
      marginTop:5,
      textAlign:'center'
    },
    infoCategoryName: {
      fontSize: 28,
      margin: 10,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center'
    }
  });