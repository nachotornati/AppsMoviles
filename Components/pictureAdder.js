import React, { createRef } from "react";
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    ImageComponent,
  } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ActionSheet from "react-native-actions-sheet";
import AppButton from "./AppButton";


const actionSheetRef = createRef();


class PictureAdder extends React.Component {
    
    constructor(props){
        super();
        console.log('Se creo boton con cat ', props.category);
        console.log('Se creo boton con id ', props.id);
        this.state = {
          id: props.id,
          category: props.category
        }

    }

    render() {
        return (
            <View>          
            <AppButton title={'+'}
                onPress={()=>{ this.openLibrary()}}/>
            </View>
        
            
            
          );
    }

    openCamera(id, category){
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

    uploadPictureToServer(imagePath){ // change url
      console.log('upload method ' + this.state.id + this.state.category)
      let url = 'https://modulo-sanitario-imagenes-db.herokuapp.com/families/image/' + this.state.id  + '/' +  this.state.category
      console.log('LINK FOTO')
      let body = new FormData();
      body.append('upload', {uri: imagePath,name: 'photo.jpg',filename :'imageTest45.jpg',type: 'image/jpg'});

      fetch(url,{ method: 'POST',headers:{  
        "Content-Type": "multipart/form-data",
        "otherHeader": "foo",
        } , body :body} )
     .then((res) => { console.log("response " +res) } ) 
     .catch((e) => console.log(e))
     .done();


    }
  }



export default PictureAdder;