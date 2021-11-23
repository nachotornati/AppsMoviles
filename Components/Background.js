import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react';

export default function Background({ children }) {

  const [state, setState] = useState(0)

  const images = [
    require("../assets/background1.jpg"),
    require("../assets/background2.jpg"),
    require("../assets/background3.jpg"),
    require("../assets/background4.jpg")
  ];

  var actualImage = images[Math.floor(Math.random()*images.length)];
/*
  const changeBackgroundImage = () => {
    let newCurrentImg = 0;
    const {images, currentImg} = state;
    const noOfImages = images.length;

    if (currentImg !== noOfImages - 1) {
      newCurrentImg = currentImg + 1;
    }

    setState({currentImg: newCurrentImg});
  }  

  useEffect( () => {changeBackgroundImage()},
    [state]
  )

  setInterval(() => this.changeBackgroundImage(), 1000);
*/
  return (
    <ImageBackground
      source={actualImage}
      resizeMode="cover"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
