/*Se importa la librería para hacer peticiones HTTP */
const axios = require('axios');

/** función que retorna la temperatura dados la latitud y la longitud*/
const getClima = async(lat, lng) => {

    /*Se hace la petición a la URL, se le pasa la latitud y la longitud, la API KEY
     Y se le configura la unidad de la temperatura a grados centigrados
    */
    const resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=ac72f31ec72d27fac162cb67e20ed85c&units=metric`);

    //Se navega a través de el objeto JSON de la respuesta hasta llegar a temp, y se guarda en una variable
    return resp.data.main.temp;
}

module.exports = {

    getClima
}