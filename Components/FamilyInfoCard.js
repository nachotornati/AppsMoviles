import { familyInfoCardStyle } from '../Styles/FamilyInfoCardStyle';
import React from 'react';
import { Text, View } from 'react-native';

export function FamilyInfoCard(props) {
    return(
        <View style={familyInfoCardStyle.familyInfoCard}> 
            <Text style={familyInfoCardStyle.category}>Apellido: Saavedra</Text>
            <Text style={familyInfoCardStyle.category}>Estado:Casado </Text>
            <Text style={familyInfoCardStyle.category}>Direccion: Peguajo</Text>
            <Text style={familyInfoCardStyle.category}>Barrio: La Matanza</Text>
            <Text style={familyInfoCardStyle.category}>Partido: Ramos</Text>
            <Text style={familyInfoCardStyle.category}>Provincia: Baires</Text>
        </View>
    );
}
