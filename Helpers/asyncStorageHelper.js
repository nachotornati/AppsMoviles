import AsyncStorage from '@react-native-async-storage/async-storage';

/*

AsyncStorage es una base de datos descriptado, asincrona, persistente
y de tipo key-value.

Hay solamente 3 metodos importantes:

- getItem(): Dada una key (un string), devuelve una promise. De esta manera
conseguimos la value para la key que pasamos.
- setItem(): Setea un valor para una key determinada. Retorna tambien una
promise.
- removeItem(): Borra el item de una key determinada. Retornar tambien una
promise.

En todas podemos agregar una funcion de callback en caso de que haya error.
En caso de que queramos guardar un json tenemos que usar JSON.stringify para
guardarlo como string.

*/

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
