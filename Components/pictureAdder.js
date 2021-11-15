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


const actionSheetRef = createRef();


class PictureAdder extends React.Component {
    constructor(props){
      super()
    }

    render() {
        return (
            <View>
              <Text>{this.props.category}</Text>
              <Text>{this.props.familyid}</Text>           
            <TouchableOpacity
                onPress={() => { actionSheetRef.current?.setModalVisible();}}>
                <Text style={{fontSize:50}}>+</Text>
              </TouchableOpacity>
        
              <ActionSheet ref={actionSheetRef}>
                <View>
                <Button title="open camera" onPress={ ()=>{ this.openCamera()}}/>
                </View>
        
                <View>
                <Button title="open gallery" onPress={ ()=>{this.openLibrary()}}/>
                </View>
              </ActionSheet>
            </View>
        
            
            
          );
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

    uploadPictureToServer(imagePath){
      let url = 'http://25.83.133.88:3000/families/image/50/bathroom_picture'
      console.log(this.props.category);
      let body = new FormData();
      body.append('upload', {uri: imagePath,name: 'photo.png',filename :'imageTest45.jpg',type: 'image/jpg'});

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