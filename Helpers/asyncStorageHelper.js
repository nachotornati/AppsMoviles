import AsyncStorage from '@react-native-async-storage/async-storage';

const guardarToken = (token) => {
    try {
        AsyncStorage.setItem('@storage_token', token)
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

const obtenerToken = async () => {
    try {
        const value = await AsyncStorage.getItem('@storage_token')
        if(value !== null) {
            return value
        }
    } catch(e) {
        console.log(e)
    }
}

const limpiarToken = async () => {
        try {
            await AsyncStorage.removeItem('@storage_token');
            return true;
        }
        catch(exception) {
            return false;
        }
}

export default {
    guardarToken,
    obtenerToken,
    limpiarToken
}