import { familyInfoCardStyle } from '../Styles/FamilyInfoCardStyle';
import React from 'react';
import { Text, View } from 'react-native';

export function FamilyInfoCard(props) {
    return(
        <View style={familyInfoCardStyle.familyInfoCard}> 
            <Text>Apellido: {props.item.apellido}</Text>
            <Text>Estado: {props.item.estado}</Text>
            <Text>Direccion:</Text>
            <Text>Barrio: {props.item.encuestaUno.direccion.barrio}</Text>
            <Text>Partido: {props.item.encuestaUno.direccion.partido}</Text>
            <Text>Provincia: {props.item.encuestaUno.direccion.provincia}</Text>
        </View>
    );
}
