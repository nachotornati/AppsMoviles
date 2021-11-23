import React, { useEffect, useState } from 'react';
import Background from '../Components/Background'
import Logo from '../Components/Logo'
import Header from '../Components/Header'
import Paragraph from '../Components/Paragraph'
import {Image, StyleSheet} from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-google-signin/google-signin';
import asyncStorageHelper from '../Helpers/asyncStorageHelper'


export default function GoogleLogIn ({navigation}){

  function config(){
    GoogleSignin.configure({
      webClientId: '366494425941-in6maviracug91a4pvgpko57h9vu38c7.apps.googleusercontent.com',
      androidClientId: '366494425941-973332v1btl22a8gcitrmgtsc7a4gbmj.apps.googleusercontent.com'
    });
  }

  async function isAllowToLog(jwt){
    
    try{

      https_options = { 
        method: 'get', 
        headers: new Headers({
          'Authorization': jwt
        })
      }
      console.log(jwt)
      result = await fetch('https://modulo-backoffice.herokuapp.com/users/user/exists', https_options);
      return result.status == 200
    }
    catch (err){
      console.log(err)
      return false
    }
  }

  var signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      jwt = userInfo.idToken

      console.log("Puede pasar a la app: ", isAllowToLog(jwt))

      if (await isAllowToLog(jwt)){
        await asyncStorageHelper.guardarToken(jwt)
        navigation.navigate('Families')
      }
      else {
        alert("Hubo un error en el inicio de sesión. Intente de nuevo.")
      }
    }
    catch (error) {
      console.log(error)
      return false
    }
  };

  config()
  return(


  <Background>

      <Image source={require( '../assets/logo.png')} style={styles.image} />
      <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={signIn}
              /*disabled={isSigninInProgress}*/
            />
  </Background>
  )

};

const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 200,
    marginBottom: 50,
  },
})
