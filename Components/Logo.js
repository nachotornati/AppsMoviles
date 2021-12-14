import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={{ uri: '../assets/logo.png' }} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 170,
    height: 170,
    marginBottom: 8,
  },
})
