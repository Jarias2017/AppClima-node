/*Se importa la librería para hacer peticiones HTTP */
const axios = require('axios');

/** función que retorna la latitud y la longitud de una ciudad, dado su nombre*/
const getLugarLatLng = async(nombre) => {

    //Se remueve el espacio y se rellena de caracteres especiales
    let nombreEncode = encodeURI(nombre);

    /*Se crea la instancia para hacer peticiones a la URL, se le configura el timeout 
    y se le pasa nombreEncode*/
    const instance = axios.create({
        baseURL: `http://open.mapquestapi.com/geocoding/v1/address?key=jko9dDrAsLuGZmzcCkiIhQhnJxDGgXVz&location=${nombreEncode}`,
        timeout: 1000
    });

    //Se hace la petición get a partir de la instancia y se guarda en una variable
    let resp = await instance.get();

    /*Se navega a través de el objeto JSON de la respuesta hasta llegar a latLng, de la primera 
      posición del array results y se guarda en una variable*/
    let latLng = resp.data.results[0].locations[0].latLng;

    //Se obtienen la latitud y longitud a partir de la variable anterior
    const lat = latLng.lat;
    const lng = latLng.lng;

    //Se retorna el nombre, la latitud y longitud obtenidas
    return {
        nombre,
        lat,
        lng
    }

}

module.exports = {

    getLugarLatLng
}