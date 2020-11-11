const lugar = require('./lugar/lugar');

const clima = require('./clima/clima');

//Se configuran los comandos permitidos para ingresar por consola
const argv = require('yargs').options({

    ciudad: {
        alias: 'c',
        desc: 'Nombre de la ciudad para obtener el clima',
        demand: true
    }

}).argv;

//Función que recibe el nombre de la ciudad que se ingresa por consola
let getInfo = async(nombre) => {

    try {

        /**Se llama a la función que devuelve las coordenadas de un lugar dado su nombre 
         * Y se guarda la respuesta en una variable*/
        let coords = await lugar.getLugarLatLng(nombre);

        console.log(coords);
        /**Se llama a la función que devuelve la temperatura de un lugar dada la latutud y su longitud
         * Y se guarda la respuesta en una variable  
         */
        let temp = await clima.getClima(coords.lat, coords.lng);

        //Se retorna un mensaje indicando el nombre y la temperatura de la ciudad ingresada por consola 
        return `El clima de ${coords.nombre} es de: ${temp} °C`;

    } catch (e) {
        /**En caso de que haya ocurra un error en alguno de las funciones se muestra un mensaje 
         * que indica que no se pudo realizar la operación 
         */
        return `No se pudo determinar el clima de: ${nombre}\n Error: ${e}`;
    }

}

/**Se define una funcion main para llamar a la función getInfo que reconoce el comando 
 * que ejecuta el archivo y recibe el nombre de la ciudad, se guarda el resultado de la
 * función en una variable y se imprime el mensaje que retorna
 */
let main = async() => {

    let info = await getInfo(argv.ciudad);
    console.log(info);

}


main();