import React from 'react';
import { TouchableHighlight, Image, Text, View ,StyleSheet} from 'react-native';
import PropTypes from 'prop-types';


export default function ViewLocationButton (props) {
    return (
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'  onPress={props.onPress}>
        <View style={styles.container}>
          <Text style={styles.text}>View Location</Text>
        </View>
      </TouchableHighlight>
    );
}

ViewLocationButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    width: 270,
    margin:20,
    borderRadius: 100,
    borderColor: '#2cd18a',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',

    backgroundColor: '#2cd18a'
  },
  text: {
    fontSize: 14,
    color: 'white'
  }
});
