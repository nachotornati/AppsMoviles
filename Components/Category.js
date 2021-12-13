import React,{Component} from "react";
import{StyleSheet,Text,View, TouchableHighlight, Image, Alert} from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageView from "react-native-image-viewing";
import { createIconSetFromFontello } from "react-native-vector-icons";
import CategoryButton from '../Components/CategoryButton';

/*

  Image Picker es un modulo que nos permite seleccionar una foto o video desde la galeria
  del celular o la camara.

  launchCamera es para poder tomar una foto o un video y launchImageLibrary es de donde
  seleccionamos un video o una imagen pero desde la libreria

  En ambas usamos options. Las que usamos fueron dos nada mas (pero hay mas)
  -mediaType: 'photo', 'video', o 'mixed'. Le decimos que tipo de media queremos seleccionar
  -selectionLimit: Por default es 1 y el 0 permite seleccionar cualquier cantidad de archivos.

  Una vez que tenemos la media, podemos obtener la URI de la media y ahi hacer lo que queramos.

*/

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

  onPressCategory(id, category, token){
      this.setIsVisible(true)
  }

  openLibrary(){
    const options = {
      mediaType:'photo',
      selectionLimit: 1,
    }

    launchImageLibrary(options,(res)=>{
      console.log("Image URI To Upload:", res.uri)
      this.uploadPictureToServer(res.uri);
    });

  }

  openCamera(){
    const options = {
      mediaType:'photo',
      selectionLimit: 1,
    }

    launchCamera(options,(res)=>{
      console.log("Image URI To Upload:", res.uri)
      this.uploadPictureToServer(res.uri);
    });
  }

  async uploadPictureToServer(imagePath){ // change url
    try{
      /*
      Para mandar la foto, tenemos que usar FormData. Nos permite compilar un conjunto de pares clave/valor para enviar mediante XMLHttpRequest. 
      Están destinados principalmente para el envío de los datos del formulario, pero se pueden utilizar de forma independiente con el fin de 
      transmitir los datos tecleados. Los datos transmitidos estarán en el mismo formato que usa el método submit() del formulario para enviar 
      los datos si el tipo de codificación del formulario se establece en "multipart/form-data".

      Los HTTP Request tienen una parte que se llama Body. Este mismo son bytes que se transmiten en una transaccion HTTP inmediatamente despues
      de los headers (si es que hay algunos, en HTTP 0.9 no hay headers).

      Para subir el archivo, dentro del body creamos una clave que se llama 'upload' (el servidor va a buscar este campo para tomar la imagen).
      Se tiene que incluir la uri a la imagen, el nombre con que lo mandamos, y el tipo de imagen.
      
      En el fetch pasamos el body    
      */

      let url = 'https://modulo-sanitario-imagenes-db.herokuapp.com/families/image/' + this.state.id  + '/' +  this.state.item.path
      let body = new FormData();
      body.append('upload', {uri: imagePath, name: 'picture.jpg', type: 'image/jpg'});
      const response = await fetch(url,{ 
          method: 'POST',
          headers:{  
            "Content-Type": "multipart/form-data",
            "otherHeader": "foo",
            "Authentication": this.state.token},
          body : body
      })

      const jsonResponse = await response.json()

      if(jsonResponse.error.flag){
        Alert.alert("Hubo un error al subir la imagen. Intente de nuevo.")
      }
      else{
        setTimeout(()=>{this.setState({imgPath: this.state.imgUri + '?time=' + new Date()})}, 2000)
      }
    }
    catch(error){
      Alert.alert("Hubo un error al subir la imagen. Intente de nuevo.")
    }
  }

  /*
  Cuando queremos borrar una imagen, primero le preguntamos al usuario si quiere realmente hacerlo. Para eso,
  usamos Alert pero un poco modificado.

  Alert.alert(stringDelTituloDelAlert, descripcionDelAlert, listadoDeAccionesQuePodemosHacerDesdeElAlert)

  */
  showConfirmDialog = () => {
    Alert.alert("Eliminar imagen", "¿Estas seguro que deseas eliminar esta imagen?",
      [
        {text: "Si", onPress: () => {this.deletePicture();}},
        {text: "No"},
      ]);
  };

  async deletePicture(){
    try{
      let url = 'https://modulo-sanitario-imagenes-db.herokuapp.com/families/image/' + this.state.id  + '/' +  this.state.item.path
      /*
      Aca usamos el metodo 'DELETE' para borrar la imagen. ¿Hay diferencia con POST?
      DELETE is idempotente mientras que POST no. Es decir, si yo uso DELETE contra
      un endpoint multiples veces tendra el mismo efecto como si lo hubiera usado
      una sola vez.  
      */
      var requestOptions = {
        method: 'DELETE',
        headers: {
          Authorization: this.state.token
        }
      };
      
      var response = await fetch(url, requestOptions)
      const jsonResponse = await response.json()

      if(jsonResponse.error.flag){
        Alert.alert("Hubo un error al eliminar la imagen. Intente de nuevo.")
      }
      else{
        let newImagePath = this.state.imgUri + '?time=' + new Date()
        setTimeout(()=>{this.setState({imgPath: newImagePath})}, 2000)
      }
    }
    catch(error){
      console.log(error)
      Alert.alert("Hubo un error al eliminar la imagen. Intente de nuevo.")
    }
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