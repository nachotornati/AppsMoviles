import React, { useEffect, useState } from 'react';
import Background from '../Components/Background'
import Logo from '../Components/Logo'
import Header from '../Components/Header'
import Paragraph from '../Components/Paragraph'

import { GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-google-signin/google-signin';
import { AsyncStorage } from 'react-native';


export default function GoogleLogIn ({navigation}){

  function config(){
    GoogleSignin.configure({
      webClientId: '',
      androidClientId: ''
    });
  }


  /*
    El backend principal
    mira el token que le mandamos
    y verifica si puede entrar a la path
    En AsyncStorage guardamos el token jwt
  */

  var signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      /*this.setState({ userInfo });*/
      console.log(userInfo.idToken) /* Este es el JWT */
      navigation.navigate('Families')
    }
    catch (error) {
      console.log(error)
    }
  };

  config()
  return(


  <Background>

      <Logo />
      <Header>Modulo Sanitario</Header>
      <Paragraph>
        Ayudar ayudando
      </Paragraph>
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