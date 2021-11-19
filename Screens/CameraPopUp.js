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
    
    function openCamera(id, category){
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
  
      function openLibrary(){
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
  
      function uploadPictureToServer(imagePath){ // change url
        console.log('upload method ' + this.state.id +' ' + this.state.category)
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


export default function CameraPopUp ({navigation,route}) {
    console.log(route);
  
      const id = route.params.id
      const category = route.params.category
    
      
    
      return (
        <ActionSheet ref={actionSheetRef}>
        <View>
        <Button title="open camera" onPress={ ()=>{ this.openCamera()}}/>
        </View>

        <View>
        <Button title="open gallery" onPress={ ()=>{this.openLibrary()}}/>
        </View>
      </ActionSheet>
      );

      
   }