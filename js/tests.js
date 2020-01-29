/*
**************************************************************************************
**********************************   CONSIGNAS   *************************************
**************************************************************************************

**************************************************************************************
Guía 1: Testeando las funcionalidades de la aplicación
Preparación
Antes de comenzar a testear la aplicación, te recomendamos que leas el código 
y entiendas qué hace cada función. Por si te quedaste con dudas o no entendiste 
algo, te explicamos las funciones más importantes, las que tendrás que testear:

Clase Restaurante
reservarHorario(horario): dado un horario (string) lo busca dentro del arreglo 
del horarios del restaurante y lo elimina.
obtenerPuntuacion(): obtiene la puntuación del restaurante, que es el promedio 
de todas las calificaciones que recibió. Esta función suma todas las calificaciones 
que se encuentran en el arreglo de calificaciones y saca el promedio.
calificar(nuevaCalificacion): agrega una nueva calificación al arreglo de 
calificaciones.

Clase Listado
buscarRestaurante(id): dado el id de un restaurante, devuelve el restaurante del 
listado que posee ese id.
obtC(): obtiene (sin repetidos) todos las ciudades en las cuáles hay un restaurante.
obtR(): obtiene (sin repetidos) todos los rubros de los restaurantes.
obtH(): obtiene (sin repetidos) todos los posibles horarios de reserva de los 
restaurantes.
obtenerRestaurantes(filtroRubro, filtroCiudad, filtroHorario): función que se 
encarga de filtrar los restaurantes según los filtros recibidos.

**********************************************************************************************

Paso 1: Creá el archivo tests.js y linkealo a test.html
	Creá el archivo tests.js dentro de la carpeta js, en el cuál vas a escribir todos 
	los tests. Una vez que lo tengas creado, linkealo al archivo tests.html. Es importante 
	que lo linkees luego de los otros archivos JS de la aplicación. Cómo el archivo test.js 
	va a ejecutar las funciones de los otros archivos para testearlas, se necesita las mismas 
	se carguen antes de que sean utilizadas.
	Una vez que tengas este archivo creado y linkeado, estás listo para comenzar a testear.

******** DONE  ********
*********************************************************************************************
Paso 2: Testeá la función reservarHorario(horario)
	Las pruebas que realices tienen que verificar que:

	A - Cuando se reserva un horario de un restaurant, el horario correspondiente se 
	elimina del arreglo.
	B - Cuando se reserva un horario que el restaurant no posee, el arreglo se 
	mantiene igual.
	C - Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, 
	el arreglo se mantiene igual.

	*/

var expect = chai.expect;



describe('Test de la funcion reservarHorario de un restaurant', function(){
	it('Cuando se reserva un horario, el horario correspondiente se elimina correctamente del arreglo.',function(){
        var restaurantAleatorio = listadoDeRestaurantes[getRandomInt(0, listadoDeRestaurantes.length-1)] ; // numero aleatorio entre 0y 23
        var horariosDisponibles = restaurantAleatorio.horarios;
        var horarioAleatorio = restaurantAleatorio.horarios[getRandomInt(0, restaurantAleatorio.horarios.length-1)] ; // numero aleatorio entre 0 y 2 
        horariosDisponibles.splice(horariosDisponibles.indexOf(horarioAleatorio),1);
        restaurantAleatorio.reservarHorario(horarioAleatorio);
        expect(restaurantAleatorio.horarios).eql(horariosDisponibles);
	})
	it('Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.',function(){
        var restaurantAleatorio = listadoDeRestaurantes[getRandomInt(0, 24)]; // numero aleatorio entre 0y 23
        var horariosDisponibles = restaurantAleatorio.horarios;
        var horarioInexistente = "10:00";
        restaurantAleatorio.reservarHorario(horarioInexistente);
        expect(restaurantAleatorio.horarios).eql(horariosDisponibles);
	})
	it('Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.',function(){
        var restaurantAleatorio = listadoDeRestaurantes[getRandomInt(0, 24)]; // numero aleatorio entre 0y 23
        var horariosDisponibles = restaurantAleatorio.horarios;
        restaurantAleatorio.reservarHorario();
        expect(restaurantAleatorio.horarios).eql(horariosDisponibles);
    })
})

// Funcion auxiliar para generar un numero entero aleatorio entre min (incluido) y max (excluido)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

	
/*	Podes hacer uno o más tests para cada caso. Por ejemplo, podes probar que:

	D - la cantidad de elementos del arreglo disminuya o no según corresponda.
	E - el arreglo se mantenga igual, exactamente con los mismos elementos.
	F - el arreglo cambie y contenga exactamente los elementos que corresponden.

******** PARTIALLY DONE  ********
**********************************************************************************************


Paso 3: Testeá la función obtenerPuntuación()
	Testeá la función obtenerPuntuacion().
	Las pruebas que realices tienen que verificar que:
	A - Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio 
		de ellas) se calcula correctamente.
	B - Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.*/

describe('Test de la funcion obtenerPuntuacion de un restaurant', function(){
	it('La puntuación (que es el promedio de ellas), se calcula correctamente.',function(){
		var restaurantAleatorio = listadoDeRestaurantes[getRandomInt(0, 24)]; // numero aleatorio entre 0y 23
		restaurantAleatorio.calificaciones = [5, 6, 7, 8, 9, 4] ;
		var unaPuntuacion =	restaurantAleatorio.obtenerPuntuacion();
		expect(unaPuntuacion).to.equal(6.5);
	})
	it('Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.',function(){
		var restaurantAleatorio = listadoDeRestaurantes[getRandomInt(0, 24)]; // numero aleatorio entre 0y 23
		restaurantAleatorio.calificaciones = [] ;
		var unaPuntuacion =	restaurantAleatorio.obtenerPuntuacion();
		expect(unaPuntuacion).to.equal(0);
	})
})


/*	Paso 4: Testeá la función calificar()
	En este paso, podés elegir vos las pruebas que quieras hacer.*/

describe('Test de la funcion calificar un restaurant', function(){
	it('Dado un restaurant que no tiene ninguna calificación, la cantidad de calificaciones aumenta en uno cada vez que el usuario ingresa una calificaciones.',function(){
		var restaurantAleatorio = listadoDeRestaurantes[getRandomInt(0, 24)]; // numero aleatorio entre 0y 23
		restaurantAleatorio.calificaciones = [];
		for (var i = 1; i < 10; i++) {
			restaurantAleatorio.calificar(i);
			expect(restaurantAleatorio.calificaciones.length).to.equal(i);		
		}
	})
	// TIENE UN ERROR LA FUNCION PUNTUAR RESTAURANT PORQUE NO SE PUEDE PONER 10 COMO NOTA, VER RESTAURANT.JS LINEA 21
	it('Dado un restaurant aleatorio, el usuario califica con una nota de 10 puntos.',function(){
		var restaurantAleatorio = listadoDeRestaurantes[getRandomInt(0, 24)]; // numero aleatorio entre 0y 23
		var cantidadDeCalificacionesAntes = restaurantAleatorio.calificaciones.length;
		restaurantAleatorio.calificar(10);
		expect(restaurantAleatorio.calificaciones.length).to.equal(cantidadDeCalificacionesAntes+1);		
	})
})


/*
Paso 5: Testeá la función buscarRestaurante(id)
	En este paso, podés elegir vos las pruebas que quieras hacer.
*/

describe('Test de la funcion buscarRestaurante.', function(){
	it('Dada una busqueda de un restaurante que no esta en el listado, la funcion buscarRestaurante(id) devuelve No se ha encontrado ningún restaurant.',function(){
		var RestaurantConIdSaraza = "Sarjosqisqojo456123aza";
		expect(listado.buscarRestaurante(RestaurantConIdSaraza)).to.equal("No se ha encontrado ningún restaurant");
	})
	it('Dadas 10 busquedas al azar de restaurantes que estan en el listado, la funcion buscarRestaurante(id) devuelve el resultado esperado.',function(){
		for (var i = 0; i < 10; i++) {
			var idAleatorio = listadoDeRestaurantes[getRandomInt(0, 24)].id;
			expect(listado.buscarRestaurante(idAleatorio)).to.equal(listadoDeRestaurantes[idAleatorio-1]);		
		}
	})
})

/*
Paso 6: Testeá la función obtenerRestaurantes()
	En este paso podés elegir vos la pruebas que quieras hacer.
*/

describe('Test de la funcion obtenerRestaurantes', function(){
	it('Dadas 20 busquedas aleatorias filtrando por rubro, la pagina filtra la cantidad correcta de resultados.',function(){
		for (var i = 0; i < 20; i++) {
			var rubroAleatorio = listadoDeRestaurantes[getRandomInt(0, 24)].rubro;
			var listadoDeRestaurantesFiltrado = listadoDeRestaurantes.filter(function (rest) {
				return (rest.rubro === rubroAleatorio);
			});
			var cantidadDeItemsObtenidos = listadoDeRestaurantesFiltrado.length;
			var restaurantsFiltrados = listado.obtenerRestaurantes(rubroAleatorio, null, null);
			expect(restaurantsFiltrados.length).to.equal(cantidadDeItemsObtenidos);		
		}
	})
	it('Dadas 20 busquedas aleatorias filtrando por ciudad, la pagina filtra la cantidad correcta de resultados.',function(){
		for (var i = 0; i < 20; i++) {
			var ciudadAleatoria = listadoDeRestaurantes[getRandomInt(0, 24)].ubicacion;
			var listadoDeRestaurantesFiltrado = listadoDeRestaurantes.filter(function (rest) {
				return (rest.ubicacion === ciudadAleatoria);
			});
			var cantidadDeItemsObtenidos = listadoDeRestaurantesFiltrado.length;
			var restaurantsFiltrados = listado.obtenerRestaurantes(null, ciudadAleatoria, null);
			expect(restaurantsFiltrados.length).to.equal(cantidadDeItemsObtenidos);		
		}
	})
	it('Dadas 20 busquedas aleatorias filtrando por horario, la pagina filtra la cantidad correcta de resultados.',function(){
		for (var i = 0; i < 20; i++) {
			var horarioAleatorio = listadoDeRestaurantes[getRandomInt(0, 24)].horarios[getRandomInt(0, 2)];
			var listadoDeRestaurantesFiltrado = listadoDeRestaurantes.filter(function(rest) {
				return rest.horarios.some(horario => horario == horarioAleatorio);
			});
			var cantidadDeItemsObtenidos = listadoDeRestaurantesFiltrado.length;
			var restaurantsFiltrados = listado.obtenerRestaurantes(null, null, horarioAleatorio);
			expect(restaurantsFiltrados.length).to.equal(cantidadDeItemsObtenidos);		
		}
	})
})







/*
************************************************************************************************
************************************************************************************************

Guía 2: Refactorizando la aplicación
Preparación
En esta guía vas a refactorizar algunas de las funcionalidades de tu aplicación.
Vas a mejorar el código aplicando buenas prácticas de programación, pero el 
funcionamiento de la aplicación no se va a modificar. Para comprobar que todo 
siga funcionando correctamente luego de hacer los cambios, no olvides correr los 
tests y verificar que sigan funcionando correctamente.


************************************************************************************************

Paso 1: Refactorizá la función reservarHorario(horario) utilizando la función filter.

	En el archivo restaurant.js, se encuentra la función reservarHorario(horario). Esta función 
	recibe un horario y se encarga de eliminarlo del arreglo de horarios del restaurante. Para esto, 
	recorre todos los horarios y cuando encuentra el que debe eliminar, utiliza la función splice 
	para hacerlo.

		splice(inicio, cantidad): recibe un inicio y la cantidad de elementos que debe eliminar 
		a partir de ese inicio. En este caso, el inicio es la posición del elemento que debe 
		eliminar y la cantidad es 1.

	En este paso, modificarás la función para que elimine el elemento del arreglo utilizando la 
	función filter. Tendrás que filtrar el arreglo de horarios para que solo se devuelvan los 
	elementos que no son iguales al horario que se recibió por parámetro.

	Recordá que filter() devuelve un nuevo arreglo con los elementos que cumplen con la condición 
	pasada por parámetro. Tendrás que asignarle al restaurant este nuevo arreglo filtrado.

	***DONE***

************************************************************************************************

Paso 2: Modularizá la función obtenerPuntuacion().

	En el archivo restaurant.js se encuentra la función obtenerPuntuacion() que se encarga de sumar 
	todas las calificaciones del restaurant y sacar el promedio.

	Esta función solo debería encargarse, como su nombre lo dice, de devolver la puntuación, no de 
	sumar los elementos de un arreglo y además, sacar el promedio.

	Para resolver este problema, creá dos funciones genéricas para resolver esas cuestiones:
		sumatoria(numeros), que reciba un arreglo de numeros y devuelva su sumatoria.
		promedio(numeros), que sume los elementos de un arreglo y luego calcule su promedio.
		Esta función debe utilizar la función sumatoria(numeros)
	Una vez que tengas esas funciones creadas, utilizalas para modularizar la función obtenerPuntuacion().

	***DONE***

************************************************************************************************

Paso 3: Modificá los nombres de las funciones obtC(), obtR() y obtH() y de la variables que 
utilizan por nombres más declarativos.

	En el archivo listado.js se encuentran estas tres funciones. En los comentarios se explica que 
	hace cada una de ellas y que significan las variables que utilizan. Cómo seguramente pudiste notar, 
	los nombre de las funciones y de las variables no son muy claros.

	En este paso, vas a mejorar el nombre de las funciones y de las variables, para que representen 
	mejor cuál es su objetivo.

	Estas funciones son llamadas en aplicacion.js, desde dibujarRubros(), dibujarHorarios() y 
	dibujarCiudades(). Cuando cambies el nombre de las funciones, recordá cambiarlo también cuándo 
	se las llama.

	Aclaración: en los siguientes pasos de la guía, vamos a referirnos a las funciones a las que 
	vas a cambiarle el nombre como obtenerRubros(), obtenerUbicaciones() y obtenerHorarios(). 
	De todas formas, podés darle el nombre que vos sientas que representa mejor lo que hace.

	***DONE***

************************************************************************************************

Paso 4: Eliminá la repetición de código en obtenerRubros(), obtenerUbicaciones() y obtenerHorarios().

	Todas estas funciones realizan la acción de eliminar los elementos repetidos de un arreglo 
	con este código:

	var c2= c.filter(function(elem, index, self) {
			return index === self.indexOf(elem);
		});

	Este código se repite en las 3 funciones. Creá una función que elimine los elementos repetidos 
	de un arreglo y llamala desde las funciones obtenerRubros(), obtenerUbicaciones() y obtenerHorarios() 
	para evitar la repetición de código.

	***DONE***

************************************************************************************************

Paso 5: Refactorizá las funciones obtenerRubros(), obtenerUbicaciones() y obtenerHorarios() 
aplicando la función map.

	Estas funciones recorren todo el arreglo utilizando un ciclo for para obtener los atributos 
	que necesitan de cada restaurante. Esta funcionalidad puede realizarse también utilizando la 
	función map().

	Modificá esta parte de las funciones aplicando la función map(). Vas a notar que tu código 
	queda más limpio y se comprende más cuál es su objetivo.

	***DONE***

************************************************************************************************

Paso 6: Modificá la función buscarRestaurant(id) aplicando la función find().

	Para encontrar un elemento con un determinado id, se recorre todo el arreglo de restaurantes 
	utilizando un ciclo for. Esto también puede resolverse utilizando la función find().

	Refactorizá la función buscarRestaurante(id) para que encuentre al restaurant con el id que 
	recibe por parámetro utilizando la función find().

	***DONE***


	
*******************************************************************************************************
*******************************************************************************************************
*******************************************************************************************************
*******************************************************************************************************
*******************************************************************************************************

Guía 3: Agregando una nueva funcionalidad con TDD

	Introducción
	
	El cliente de nuestro proyecto nos pidió que agreguemos una nueva funcionalidad a la aplicación. 
	Ahora, las reservas de un restaurante van a ser más que tan solo un horario. El cliente quiere 
	que tengan más atributos asociados.

	En esta etapa, no vamos a relacionar un restaurante con una reserva, solo vamos a encargarnos 
	de modelarlas y de definir sus funcionalidades principales.

	Requerimientos de la aplicación
	
	1) Modelar el objeto Reserva
		Este objeto debe tener como atributos:
			Horario: objeto de tipo Date que va a representa la fecha y la hora de la reserva.
			Cantidad de personas: un número entero.
			Precio por persona: un número entero.
			Código de descuento: un string.
	
	2) Desarrollar la funcionalidad que calcule el precio base de una reserva
		El precio base de una reserva es igual a la cantidad de personas por el precio por persona.

	3) Desarrollar la funcionalidad que calcule el precio total de una reserva
		La reserva debe ser capaz de responder el precio final:
			precio final = precio base + adicionales - descuentos
	
		Los adicionales y los descuentos son los siguientes:
			Descuentos:
				Descuento por grupos grandes: si la cantidad de personas de la reserva está entre 4 y 6 
				personas, se agrega un 5% de descuento. Para grupos entre de 7 y 8 personas un 10% de 
				descuento y para grupos de más de 8 personas un 15% de descuento.
				Descuento por código: algunas reservas pueden tener un código de descuento asociado. 
				Si no tienen ninguno, no se les otorga ningún descuento. Los códigos son:
				DES15: obtiene un 15% de descuento.
				DES200: obtiene $200 de descuento.
				DES1: obtiene de descuento el valor equivalente al precio de una persona.
		
			Adicionales:
				Adicional por horario: las franjas horarias de 13 a 14 y de 20 a 21 horas son muy 
				concurridas. Se agrega un adicional del 5% si la reserva fue hecha para un horario 
				dentro de esos rangos.
				Adicional por fin de semana: si la reserva fue realizada para alguno de los días del 
				fin de semana (viernes, sábado o domingo) se le agrega un adicional del 10%.

	***DONE***




***********************************************************************************************************

Paso 1 - Red: Convertí los requerimientos en pruebas unitaria

	Lee nuevamente con atención los requerimientos de la aplicación. 
	Una vez que los tengas claros, escribí los tests que validen su funcionamiento.

	Tendrás que validar:
		Que un restaurante calcule correctamente su precio base.
		Que un restaurante calcule correctamente su precio final, contemplando bien los descuentos y 
		los adicionales.
		Te damos algunos ejemplos de restaurantes con su respectivo precio base y precio final para 
		que te ahorres los cálculos. Igualmente, podés crear los objetos que quieras para realizar 
		las pruebas.
			var reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1")
			var reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200")
		Reserva 1:
			Precio base: 2800
			Precio final: 2310
		Reserva 2:
			Precio base: 300
			Precio final: 100

	Prestá atención a la creación del objeto Date. Revisá primero, que representan los parámetros 
	que recibe. Por ejemplo, para representar los meses, se utilizan valores del 0 al 11, dónde 0 
	es enero y 11 es diciembre.Te dejamos documentación para que leas sobre este objeto.

	Una vez que termines de crear todos los tests, ejecutalos abriendo el archivo test.html y 
	fijate que todos fallen. En el siguiente paso, vas a escribir el código necesario para que 
	comiencen a funcionar.
*/

describe("Calculo de precio base de una reserva", function() {
	it("Calculo de precio base con todos los datos pasados correctamente", function() {
	  var primeraReserva = new Reserva(new Date(2018, 11, 3, 15, 00), 4, 300, "");
	  expect(primeraReserva.calcularPrecioBase()).to.equal(1200);
	  var segundaReserva = new Reserva(new Date(2018, 11, 1, 13, 00), 2, 400, "");
	  expect(segundaReserva.calcularPrecioBase()).to.equal(800);
	  var terceraReserva = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "");
	  expect(terceraReserva.calcularPrecioBase()).to.equal(2800);
	  it("Calculo de precio base con datos incorrectos, devuelve error", function() {
		var cuartaReserva = new Reserva(new Date(2018, 11, 28, 14, 00), a, 400, "" );
		var quintaReserva = new Reserva(new Date(2018, 11, 28, 14, 00), 6, null, "" );
		var sextaReserva = new Reserva(null, 8, 800, "");
		expect(cuartaReserva.calcularPrecioBase()).to.equal("Dato incorrecto");
		expect(quintaReserva.calcularPrecioBase()).to.equal("Dato incorrecto");
		expect(sextaReserva.calcularPrecioBase()).to.equal("Dato incorrecto");
	  });
	});
});
  
describe("Calculo del precio final de reserva", function() {
	it("Calculo de precio base con datos incorrectos, devuelve error", function() {
	  var cuartaReserva = new Reserva(new Date(2018, 11, 28, 14, 00), "a", 400, "DES15");
	  var quintaReserva = new Reserva(new Date(2018, 11, 28, 14, 00), 6, null, "" );
	  var sextaReserva = new Reserva(null, 8, 800, "");
	  expect(cuartaReserva.calcularPrecioFinal()).to.be.equal("Dato incorrecto");
	  expect(quintaReserva.calcularPrecioFinal()).to.be.equal("Dato incorrecto");
	  expect(sextaReserva.calcularPrecioFinal()).to.be.equal("Dato incorrecto");
	});
	it("Calculo precio de reservas dia de semana, hora no pico, grupos < 4 c/ desc.", function() {
	  var reserva1 = new Reserva(new Date(2018, 6, 24, 11, 00), 3, 350, "DES1");
	  var reserva2 = new Reserva(new Date(2018, 6, 24, 15, 100), 2, 150, "DES200");
	  var reserva3 = new Reserva(new Date(2018, 6, 24, 16, 100), 1, 250, "DES15");
	  expect(reserva1.calcularPrecioFinal()).to.be.equal(3 * 350 - 350);
	  expect(reserva2.calcularPrecioFinal()).to.be.equal(2 * 150 - 200);
	  expect(reserva3.calcularPrecioFinal()).to.be.equal(1 * 250 * 0.85);
	});
	it("Calculo precio de reservas dia de semana, hora pico, grupos < 4 c/ desc.", function() {
	  var reserva1 = new Reserva(new Date(2018, 6, 23, 13, 00), 2, 400, "DES200");
	  var reserva2 = new Reserva(new Date(2018, 11, 12, 13, 00), 3, 300, "DES1");
	  expect(reserva1.calcularPrecioFinal()).to.be.equal((2 * 400 - 200) * 1.05);
	  expect(reserva2.calcularPrecioFinal()).to.be.equal((3 * 300 - 300) * 1.05);
	});
	it("Calculo precio de reservas fin de semana, hora pico, grupos < a 4 con descuentos.", function() {
	  var reserva1 = new Reserva(new Date(2018, 11, 29, 13, 00), 2, 400, "DES200");
	  expect(reserva1.calcularPrecioFinal()).to.be.equal((2 * 400 - 200) * 1.15);
	});
	it("Calculo de precio de reservas día de semana, hora no pico, grupos menores a 4 sin descuento", function() {
	  var reserva1 = new Reserva(new Date(2018, 6, 23, 11, 00), 3, 400, "");
	  var reserva2 = new Reserva(new Date(2018, 11, 24, 11, 00), 2, 150, "");
	  expect(reserva1.calcularPrecioFinal()).to.be.equal(3 * 400);
	  expect(reserva2.calcularPrecioFinal()).to.be.equal(2 * 150);
	});
	it("Calculo de precio de reservas día de semana, hora no pico, grupos menores a 4 con descuento", function() {
	  var reserva1 = new Reserva(new Date(2018, 6, 23, 11, 00), 3, 400, "DES200");
	  var reserva2 = new Reserva(new Date(2018, 11, 24, 11, 00), 2, 150, "DES1");
	  expect(reserva1.calcularPrecioFinal()).to.be.equal(3 * 400 - 200);
	  expect(reserva2.calcularPrecioFinal()).to.be.equal(2 * 150 - 150);
	});
	it("Calculo de precio de reservas día de semana, hora pico, grupos de cuatro a seis con descuento", function() {
	  var reserva1 = new Reserva(new Date(2018, 6, 23, 13, 00), 5, 400, "DES200");
	  var reserva2 = new Reserva(new Date(2018, 11, 12, 13, 00), 5, 300, "DES1");
	  expect(reserva1.calcularPrecioFinal()).to.be.equal((5 * 400 - 200) * 0.95 * 1.05);
	  expect(reserva2.calcularPrecioFinal()).to.be.equal((5 * 300 - 300) * 0.95 * 1.05);
	});
	it("Calculo de precio de reservas día de semana, hora no pico, grupos de cuatro a seis con descuento", function() {
	  var reserva1 = new Reserva(new Date(2018, 6, 23, 11, 00), 5, 400, "DES200");
	  var reserva2 = new Reserva(new Date(2018, 11, 24, 11, 00), 5, 150, "DES1");
	  expect(reserva1.calcularPrecioFinal()).to.be.equal((5 * 400 - 200) * 0.95);
	  expect(reserva2.calcularPrecioFinal()).to.be.equal((5 * 150 - 150) * 0.95);
	});
	it("Calculo de precio de reservas fin de semana, hora pico, grupos de cuatro a seis sin descuento", function() {
	  var reserva1 = new Reserva(new Date(2018, 11, 29, 13, 00), 5, 400, "");
	  var reserva2 = new Reserva(new Date(2018, 11, 29, 13, 00), 5, 150, "");
	  expect(reserva1.calcularPrecioFinal()).to.be.equal(5 * 400 * 0.95 * 1.15);
	  expect(reserva2.calcularPrecioFinal()).to.be.equal(5 * 150 * 0.95 * 1.15);
	});
	it("Calculo de precio de reservas fin de semana, hora no pico, grupos de cuatro a seis con descuento", function() {
	  var reserva1 = new Reserva(new Date(2018, 11, 22, 11, 00), 5, 400, "DES200");
	  var reserva2 = new Reserva(new Date(2018, 11, 29, 11, 00), 5, 150, "DES15");
	  expect(reserva1.calcularPrecioFinal()).to.be.equal((5 * 400 - 200) * 0.95 * 1.1);
	  expect(reserva2.calcularPrecioFinal()).to.be.equal(5 * 150 * 0.85 * 0.95 * 1.1);
	});
  	it("Calculo de precio de reservas día de semana, hora pico, grupos de siete a ocho con descuento", function() {
	  var reserva1 = new Reserva(new Date(2018, 6, 23, 13, 00), 7, 400, "DES200");
	  var reserva2 = new Reserva(new Date(2018, 11, 24, 13, 00), 8, 150, "DES1");
	  expect(reserva1.calcularPrecioFinal()).to.be.equal((7 * 400 - 200) * 0.9 * 1.05);
	  expect(reserva2.calcularPrecioFinal()).to.be.equal((8 * 150 - 150) * 0.9 * 1.05);
	});
	it("Calculo de precio de reservas día de semana, hora no pico, grupos de siete a ocho con descuento", function() {
	  var reserva1 = new Reserva(new Date(2018, 6, 23, 11, 00), 7, 400, "DES200");
	  var reserva2 = new Reserva(new Date(2018, 11, 24, 11, 00), 8, 150, "DES1");
	  expect(reserva1.calcularPrecioFinal()).to.be.equal((7 * 400 - 200) * 0.9);
	  expect(reserva2.calcularPrecioFinal()).to.be.equal((8 * 150 - 150) * 0.9);
	});
  
	it("Calculo de precio de reservas fin de semana, hora pico, grupos de siete a ocho sin descuento", function() {
	  var reserva1 = new Reserva(new Date(2018, 11, 29, 13, 00), 7, 400, "");
	  var reserva2 = new Reserva(new Date(2018, 11, 29, 13, 00), 8, 150, "");
	  expect(reserva1.calcularPrecioFinal()).to.be.equal(7 * 400 * 0.9 * 1.15);
	  expect(reserva2.calcularPrecioFinal()).to.be.equal(8 * 150 * 0.9 * 1.15);
	});
  
	it("Calculo de precio de reservas fin de semana, hora no pico, grupos de siete a ocho con descuento", function() {
	  var reserva1 = new Reserva(
		new Date(2018, 11, 29, 11, 00),	7, 400, "DES200");
	  var reserva2 = new Reserva(new Date(2018, 11, 29, 11, 00), 8, 150, "DES1");
	  expect(reserva1.calcularPrecioFinal()).to.be.equal((7 * 400 - 200) * 0.9 * 1.1);
	  expect(reserva2.calcularPrecioFinal()).to.be.equal((8 * 150 - 150) * 0.9 * 1.1);
	});
  });

/*
************************************************************************************************

Paso 2 - Green: Escribí el código mínimo e indispensable para que las pruebas pasen

	En este paso vas a comenzar a programar para que las pruebas empiezen a funcionar. Recordá que 
	no tenes que focalizarte en crear buen código, tenés desarrollar la menor cantidad de código 
	para que las pruebas pasen. 
	
	Tendrás que:
		Crear el archivo reserva.js y linkearlo al HTML. Recordá que tiene que estar antes del archivo 
		tests.js.
	
	Crear el constructor del objeto reserva con los parámetros que corresponden: horario, cantidad 
	de personas, precio por persona y código de descuento.
	
	Crear la función que devuelva el precio base de la reserva.
	
	Crear la función que calcule el precio final de la reserva. Esta función seguramente te quede 
	muy larga, ya que tiene que calcular todos los descuentos y adicionales. No te preocupes por eso, 
	en el siguiente paso vas a encargarte de mejorar tu código.
	
	A medida que vayas desarrollando las funcionalidades, podes ejecutar el archivo test.html para 
	probar que los test comiencen a dar el resultado esperado.

************************************************************************************************

Paso 3 - Refactor: Mejorá las funcionalidades de la reserva

En este paso vas a refactorizar y mejorar el código que escribiste en el paso anterior.

Te focalizarás en la función que calcula el precio final de la reserva. Seguramente esa función 
sea larga y se encargue de hacer muchas cosas. Tiene que calcular el precio base, calcular los 
descuentos, calcular los adicionales y sumar y restar los valores obtenidos para obtener el 
precio final. No está bueno que eso pase. Cómo ya sabemos, una buena práctica de programación 
es que las responsabilidades estén divididas y las funciones modularizadas, cada una encargándose 
de lo que le corresponde.

Para refactorizar el código tendrás que modularizar la función que calcula el precio final, 
dividiendo en otras funciones el cálculo de cada adicional y cada descuento. Tenés que lograr 
que esa función solo se encargue de realizar el cálculo: precio base - descuentos + adicionales.

A medida que vayas haciendo modificaciones en tu código, corré los tests para verificar que 
todo siga funcionando.
*/