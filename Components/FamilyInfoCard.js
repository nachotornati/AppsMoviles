import { familyInfoCardStyle } from '../Styles/FamilyInfoCardStyle';
import React from 'react';
import { Text, View } from 'react-native';

export function FamilyInfoCard(props) {
    return(
        <View style={familyInfoCardStyle.familyInfoCard}> 
            <Text style={familyInfoCardStyle.category}>Apellido: {props.item.apellido}</Text>
            <Text style={familyInfoCardStyle.category}>Estado: {props.item.estado}</Text>
            <Text style={familyInfoCardStyle.category}>Direccion:</Text>
            <Text style={familyInfoCardStyle.category}>Barrio: {props.item.encuestaUno.direccion.barrio}</Text>
            <Text style={familyInfoCardStyle.category}>Partido: {props.item.encuestaUno.direccion.partido}</Text>
            <Text style={familyInfoCardStyle.category}>Provincia: {props.item.encuestaUno.direccion.provincia}</Text>
        </View>
    );
}
