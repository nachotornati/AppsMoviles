import { FamilyInfoCard } from '../Components/FamilyInfoCard';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Modal, Pressable, KeyboardAvoidingView, ActivityIndicator, Animated, PanResponder } from 'react-native';
import { Dimensions } from 'react-native';
import asyncStorageHelper from '../Helpers/asyncStorageHelper'
import { TextInput, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

const { width, height } = Dimensions.get('window');

/*

Los componentes funcionales no poseen estado. Pero se puede usar Hooks.

¿Que es un Hook?

Los Hooks son funciones que te permiten “enganchar” el estado de React y el ciclo de vida desde componentes de función. 
Los hooks no funcionan dentro de las clases — te permiten usar React sin clases.

React proporciona algunos Hooks incorporados como useState. También puedes crear tus propios Hooks para reutilizar 
el comportamiento con estado entre diferentes componentes. Primero veremos los Hooks incorporados.

No poseen estado. Pero, se puede usar hooks. useState es un Hook.
Lo llamamos dentro de un componente de función para agregarle un estado local. 
React mantendrá este estado entre re-renderizados.
useState devuelve un par: el valor de estado actual y una función que le permite actualizarlo.

Puedes llamar a esta función desde un controlador de eventos o desde otro lugar. Es similar a this.setState en una clase, 
excepto que no combina el estado antiguo y el nuevo.

El único argumento para useState es el estado inicial. En el ejemplo anterior, es 0 porque nuestro contador 
comienza desde cero. Ten en cuenta que a diferencia de this.state, el estado aquí no tiene que ser un objeto 
— aunque puede serlo si quisieras. El argumento de estado inicial solo se usa durante el primer renderizado.
*/

export default function FamiliesScreen({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [token, setToken] = useState();
  const [apellido, setApellido] = useState('');
  const [barrio, setBarrio] = useState('');
  const [loading, setLoading] = useState(true);
  const [apellidoHolder, setApellidoHolder] = useState('');
  const [barrioHolder, setBarrioHolder] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  /*

  useEffect es un Hook de efecto. Agrega la capacidad de realizar efectos secundarios
  desde un componente de funcion. Tiene el mismo proposito que (se entiende por montar
  a la primera renderizacion):
  -componentDidMount: Se invoca inmediatamente despues de que un componente se monte
  -componentDidUpdate: Se invoca inmediatamente después de que la actualización ocurra.
  -componentWillUnmount: Se invoca inmediatamente antes de desmontar y destruir un componente.

  en las clases React pero unificadas en una sola API.
  
  La funcion que declaramos en el useEffect podria devolver una función. Esa funcion es la cleanup function.
  Eso es cuando el usuario deja la pagina y el componente se desmonta.

  Tambien se incluye un arreglo y es donde ponelos los estados que van a actualizarse en el ciclo de vida
  del componente. Cada vez que actualizamos variables (o estados) que se incluyan en esos arreglos, se corre
  el useEffect.

  */
  const [pageNum, setpageNum] = useState(1);
  const [currentPage, setCurrentPage] = useState(1)
  const [isFetching, setIsFetching] = useState(false)
  const [shouldClean, setShouldClean] = useState(true)
  const [panResponder, setPanResponder] = useState(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderEnd: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => true,
    onPanResponderRelease: (e, gesto) => true,
    onPanResponderMove: (e, gesto) => {
      if (gesto.dy >= 90) {
        setTimeout(() => { setModalVisible(false) });
      }
    }
  }));

  useEffect( () => {
    obtenerDatos()
  }, [apellido, barrio, currentPage])

  //setOptions es un metodo que nos permite configurar la screen dentro del mismo

  navigation.setOptions({
    headerRight: () => {
      return (<Icon size={30} onPress={() => { setModalVisible(true) }} name='filter' />)
    },
    headerLeft: () => {
      return (<Icon size={30} style={{ marginRight: 20 }} onPress={() => { asyncStorageHelper.limpiarToken(); GoogleSignin.signOut(); navigation.goBack() }} name='door-open' />)
    },
  })

  /*
  async viene de asincrono. Cuando hacemos async ()... estamos creando una función que es asincrona.
  Siempre que nosotros llamemos a una funcion asincrona, se devuelve un elemento Promise.
  
  Cuando la función async devuelve un valor, Promise se resolverá con el valor devuelto. 
  Si la función async genera una excepción o algún valor, Promise se rechazará con el valor generado.

  ¿Que es una Promise?

  El objeto Promise (Promesa) es usado para computaciones asíncronas. Una promesa representa un valor que 
  puede estar disponible ahora, en el futuro, o nunca.

  Se crea de la siguiente manera:

  unaPromise = new Promise((resolve, reject) => {
    //mucho codigo
    resolve({lo que deuelve la promesa});
  })

  Obtenemos lo que el promise nos devuelve con then

  unaPromise.then((datos) => console.log(datos));

  Las promesas se pueden ir concatenando.

  En caso de que queramos el resultado de la Promise y no tenes que usar el then(), podemos usar el await

  datos = await unaPromise();

  Si queremos usar el reject, en cualquier parte del codigo se puede agregar 

  reject(new Error('Texto del error...'))

  Una función async puede contener una expresión await, la cual pausa la ejecución de la función asíncrona 
  y espera la resolución de la Promise pasada y, a continuación, reanuda la ejecución de la función async y devuelve el valor resuelto. 
  
  La finalidad de las funciones async/await es simplificar el comportamiento del uso síncrono de promesas y realizar algún comportamiento específico 
  en un grupo de Promises. Del mismo modo que las Promises son semejantes a las devoluciones de llamadas estructuradas, async/await se asemejan a una combinación 
  de generadores y promesas.

  */

  const obtenerDatos = async () => {
    setIsFetching(true)

    jwt = await asyncStorageHelper.obtenerToken()
    https_options = { 
      method: 'get', 
      headers: new Headers({
        'Authorization': jwt
      })
    }

    let url = "http://modulo-backoffice.herokuapp.com/families/obtain-families?limit=4&page=" + currentPage

    if (apellido) {
      url += "&apellido=" + apellido
    }

    if (barrio) {
      url += "&barrio=" + barrio
    }

    console.log(url)
    const data = await fetch(url, https_options)
    const users = await data.json() //Es otra promise el .json()

    if (shouldClean) {
      console.log("Se limpia usuarios...")
      setUsuarios(users.results)
      setShouldClean(false)
    }
    else if (users.length != 0) {
      let newUsers = [...usuarios, ...users.results]
      let uniqueUsers = newUsers.filter((v, i, a) => a.findIndex(t => (t._id === v._id)) === i)
      setUsuarios(uniqueUsers)
    }

    setToken(jwt)
    setLoading(false)
    setIsFetching(false)
  }

  const renderFamily = ({ item }) => (
    <FamilyInfoCard navigation={navigation} item={item} token={token}></FamilyInfoCard>
  );

  const fetchMoreFamilies = async () => {
    setCurrentPage(currentPage + 1)
  }

  return (
    <View>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible); }}>
        <Animated.View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} {...panResponder.panHandlers}>
          <View style={styles2.centeredView}>
            <KeyboardAvoidingView style={styles2.modalView}>
              <Icon size={30} name="window-minimize" style={{ marginBottom: 200, textAlign: "center" }} onPress={() => { setModalVisible(false) }} />
              <Title style={{ marginBottom: 15 }}>Filtros</Title>
              <TextInput style={styles2.textInput} type="text" onChangeText={(text) => setApellidoHolder(text)} value={apellidoHolder} placeholder={"Ingrese un apellido..."} />
              <TextInput style={styles2.textInput} type="text" onChangeText={(text) => setBarrioHolder(text)} value={barrioHolder} placeholder={"Ingrese un barrio..."} />
              <Pressable style={[styles2.button, styles2.buttonClose]} onPress={() => {
                setShouldClean(true)
                setApellido(apellidoHolder)
                setBarrio(barrioHolder)
                setCurrentPage(1)
                setModalVisible(!modalVisible)
                setUsuarios([]);
              }}>
                <Text style={styles2.textStyle}>Filtrar</Text>
              </Pressable>
              <Pressable style={[styles2.buttonBorrar, styles2.buttonClose]} onPress={() => {
                setShouldClean(true)
                setBarrioHolder('')
                setApellidoHolder('')
                setApellido('')
                setBarrio('')
                setCurrentPage(1)
                setModalVisible(!modalVisible)
              }}>
                <Text style={styles2.textStyle}>Borrar</Text>
              </Pressable>
            </KeyboardAvoidingView>
          </View>
        </Animated.View>
      </Modal>


      {loading ? (
        <ActivityIndicator
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          textContent={'Loading...'}
          //Text style of the Spinner Text
          size="large" color="#0000ff"
          style={{
            height: height - 50,
            width: width,
          }}
        />
      ) : (

        <FlatList
          refreshing={isFetching}
          data={usuarios}
          ListEmptyComponent={
            <View style={{
              height: height,
              width: width,
              backgroundColor: "transparent",
              alignItems: "center"
            }}>
              <Icon name="exclamation-circle" size={100} style={{ marginTop: 250 }} color="#A00" />
              <Text style={{
                textAlign: "center",
                marginTop: 20
              }}>No hay familias que coincidan con los parametros de búsqueda</Text>
            </View>
          }
          renderItem={renderFamily}
          onEndReached={fetchMoreFamilies}
          onEndReachedThreshold={0.5}
          keyExtractor={(item) => item._id.toString()}
        />
      )}

    </View>
  );
};

/*

Arriba usamos el FlatList. Tenemos varias props importantes:

- data (requerida): Es un arreglo.
- renderItem (requerida): Toma un elemento de Data y lo renderiza. Puede tomar mas parametros como index, separators, etc.
- keyExtractor: Sirve para extraer una key unica para un item especifico en un index determinado. La key se usa para hacer
una "cache" y hacer un tracking del reordenado de la lista. Si no la pasamos, puede llegar a andar pero tenemos que estar
seguro que cada item del arreglo que pasamos por data entienda el atributo id. En nuestro caso, tiene que entender _id,
por lo tanto tuvimos que rehacerlo.
-ListEmptyComponent: Si no hay elementos en la lista, que se renderice el componente que pasamos por la prop.
-onEndReached: Por lo general, al llegar al fin de la lista, vamos a querer seguir agregando elementos a la misma. Esta
prop nos puede ser de mucha ayuda. Le pasamos una funcion que se llama una vez que la posición scrolleada se encuentra
adentro del onEndReachedThreshold del contenido renderizado.
-onEndReachedThreshold: es el número de "pantallas visibles" (es decir, las alturas de su elemento de lista) debe desplazarse 
hasta que se active su devolución de llamada onEndReached - más grande onEndReachedThreshold, menos debería desplazarse. 
Con el valor onEndReachedThreshold = 0.5, su devolución de llamada se activará casi al "final" de la lista. Pero recuerde que 
no se disparará hasta que se represente el último elemento, sin importar el valor que establezca.

*/

const styles2 = StyleSheet.create({
  buttonBorrar: {
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textInput: {
    height: 50,
    width: 200,
    marginBottom: 25,
    backgroundColor: "white"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    width: width,
    height: height,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    width: 185
  },
});
