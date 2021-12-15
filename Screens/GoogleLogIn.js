import React from 'react';
import Background from '../Components/Background'
import {Image, StyleSheet} from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-google-signin/google-signin';
import asyncStorageHelper from '../Helpers/asyncStorageHelper'


/*

Un módulo es una unidad autónoma que puede exponer activos 
a otros módulos usando export y adquirir activos de otros módulos usando import.

export default se utiliza para exportar una sola clase, función o primitivo 
desde un archivo de script.

Esto se usa para importar esta función en otro archivo de script.
Si hacemos:

import HelloWorld from './HelloWorld';

No necesariamente lo importa, ya HelloWorld que puede darle cualquier nombre, 
ya que es una exportación predeterminada

Los components podemos hacerlos como funciones. Abajo hay un ejemplo. Son simplemente
funciones de Javascript. Pueden recibir parametros y lo que retornan es codigo JSX.

*/


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

  /*

  ¿Por que usamos {{}} cuando pasamos estilos?

  Cuando creamos un objeto en JS, podemos hacerlo con {...atributo:_,otroAtributo:_... y asi}.
  Ahora bien, las props no necesariamente se crean con {}. En el caso que nuestro dato no sea
  estatico (como puede ser un nombre), podemos escribirlo sin {}. Aca va un ejemplo:

  <Person name="John" /> 

  Si el valor pasado NO es estático, por ejemplo, viene de una variable, se tiene que pasar entre {}_

  <Person name={nameFromState} /> 

  {} sirve para poder interpolar cualquier cosa dentro de JSX, entonces, todo lo que esté entre {} (dentro
  de una etiqueta lo que sea, viene de JS).
  
  */

  return(
  <Background>
    <Image source={require( '../assets/logo.png')} style={styles.image} />
    <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
    />
  </Background>
  )

};

/*

StyleSheet es una abstracción similar a como nosotros definiamos los estilos en CSS.
StyleSheet.create() nos permite crear un estilo apartir de un objeto determinado.
Luego esos estilos que nosotros cargamos podemos cargarlos en la prop style de
los componentes de react-native.

Cosas importantes para considerar:

- Margin: Es todo lo que esta por fuera del Border
- Border: Es todo lo que esta entre Margin y Padding
- Padding: Es todo lo que esta entre el Padding y el Component

-TODAS LAS DIMENSIONES EN REACT-NATIVE NO TIENEN UNIDAD. Son representadas por
la densidad independiente de pixeles. Esto nos sirve para poder renderizar los componentes
siempre de la imsma manera sin depender de los tamaños de la pantalla.

Density Independent Pixels (dp) es la unidad que se maneja en React-Native. Son unidades
flexibles que escalan para tener dimensiones uniformen en cualquier pantalla. Si tenemos
mayor densidad de pixeles, mayor pixeles tiene nuestra pantalla.

Si un pixel es igual a 160 Dp, dos pixeles va a terminar siendo igual a 320.


*/

const styles = StyleSheet.create({
  image: {
    width: 310,
    height: 200,
    marginBottom: 50,
  },
})
