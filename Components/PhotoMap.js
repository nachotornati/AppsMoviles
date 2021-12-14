import React,{Component} from "react";
import { render } from "react-dom";
import{Platform, StyleSheet,Text,View} from "react-native";
import MapView, {Marker} from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';

/*

MapView es una componente de la comunicad de react-native para
poder usar mapas. No tiene mucho que digamos. Le podemos pasar
un estilo y tambien una region. Dentro de region podemos pasar
un objeto con los siguientes atributos:

-latitude: latitud del centro del mapa
-longitude: longitud del centro del mapa

Solo se usa uno de latitudeDelta o longitudeDelta para calcular 
el tamaño del mapa. Toma la mayor de las dos de acuerdo con la 
siguiente fórmula e ignora la otra. Esto se hace para evitar 
estirar el mapa.

El mapa se dimensiona de acuerdo con el ancho y la altura 
especificados en los estilos y/o calculado por react-native.
El mapa calcula dos valores, longitudeDelta/width y latitudeDelta/height, 
compara esos 2 valores calculados y toma el mayor de los dos.
El mapa se amplía según el valor elegido en el paso 2 y el otro valor se ignora.

Si el valor elegido es longitudeDelta, entonces el borde izquierdo es 
longitude - longitudeDelta y el borde derecho es longitude + longitudeDelta.
La parte superior e inferior son los valores necesarios para llenar la altura sin estirar el mapa.

Si el valor elegido es latitudeDelta, entonces el borde inferior es 
latitude - latitudeDelta y el borde superior es latitude + latitudeDelta. 
Los valores izquierdo y derecho son los necesarios para llenar el ancho sin estirar el mapa.

Luego, podemos poner markers (todos los que queramos) con una coordenada especifica
*/


export default class PhotoMap extends Component{
 
    render(){
        return(

            <View style= {styles.container}>
                <MapView 
                    style={styles.map}
                    region={{
                        latitude:this.props.latitude,
                        longitude:this.props.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta:0.01,
                    }}
                >
                <Marker coordinate={{latitude:this.props.latitude+0.001, longitude:this.props.longitude}}></Marker>
                            
                </MapView>

            </View>
        );
    }

}
const styles= StyleSheet.create({
    container:{
        width: '100%', height: '100%'
    },
    map:{
        width: '100%', height: '100%' 
    }
});