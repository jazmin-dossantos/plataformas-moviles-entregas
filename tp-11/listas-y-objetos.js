var listaPersonasEjemplo = [
    {
        "apellido": "Perez",
        "nombre": "Juan",
        "edad": 20,
        "documento": 12345
    },
    {
        "apellido": "Lopez",
        "nombre": "Luis",
        "edad": 20,
        "documento": 23456
    },
    {
        "apellido": "Zapata",
        "nombre": "Pablo",
        "edad": 10,
        "documento": 34567
    },
    {
        "apellido": "Acuña",
        "nombre": "Ana",
        "edad": 30,
        "documento": 45678
    },
];


/**
 * 01 - ordenarPorApellido
 * 
 * Recibe
 * - `listaDePersonas`: una lista, array, con objetos de la forma `persona`.
 * 
 * Retorna: 
 * - el mismo listado, ordenado alfabéticamente por el apellido de la persona 
 */
function ordenarPorApellido(listaDePersonas) {
    for (let i = 0; i < listaDePersonas.length; i++) {
        for (let j = i + 1; j < listaDePersonas.length; j++) {

            if (listaDePersonas[i].apellido > listaDePersonas[j].apellido) {

                let personaAuxiliar = listaDePersonas[i];

                listaDePersonas[i] = listaDePersonas[j];

                listaDePersonas[j] = personaAuxiliar;
            }
        }
    }

    return listaDePersonas;
}

console.log("ordenarPorApellido()", ordenarPorApellido(listaPersonasEjemplo));


/**
 * 02 - soloNombres
 * 
 * Recibe
 * - `listaDePersonas`: una lista, array, con objetos de la forma `persona`
 * 
 * Retorna: 
 * - una lista de strings, con sólo los nombres de las personas
 */
function soloNombres(listaDePersonas) {
    let listaDeNombres = [];

    for (let i = 0; i < listaDePersonas.length; i++) {
        listaDeNombres.push(listaDePersonas[i].nombre);
    }

    return listaDeNombres;
}

console.log("soloNombres()", soloNombres(listaPersonasEjemplo));


/**
 * 03 - promedioEdades
 * 
 * Recibe
 * - `listaDePersonas`: una lista, array, con objetos de la forma `persona`
 * 
 * Retorna: 
 * - un numero, con el cálculo del promedio de las edades
 */
function promedioEdades(listaDePersonas) {
    let sumaEdades = 0;

    for (let i = 0; i < listaDePersonas.length; i++) {
        sumaEdades = sumaEdades + listaDePersonas[i].edad;
    }

    let promedio = sumaEdades / listaDePersonas.length;

    return promedio;
}

console.log("promedioEdades()", promedioEdades(listaPersonasEjemplo));


/**
 * 04 - cumplirAños
 * 
 * Recibe
 * - `listaDePersonas`: una lista, array, con objetos de la forma `persona`
 * 
 * Retorna: 
 * - una nueva lista, donde la edad de cada persona se incrementa en 1.
 */
function cumplirAños(listaDePersonas) {
    let nuevaLista = [];

    for (let i = 0; i < listaDePersonas.length; i++) {

        let nuevaPersona = {
            apellido: listaDePersonas[i].apellido,
            nombre: listaDePersonas[i].nombre,
            edad: listaDePersonas[i].edad + 1,
            documento: listaDePersonas[i].documento
        };

        nuevaLista.push(nuevaPersona);
    }

    return nuevaLista;
}

console.log("cumplirAños()", cumplirAños(listaPersonasEjemplo));


/**
 * 05 - soloMayoresDeEdad
 * 
 * Recibe
 * - `listaDePersonas`: una lista, array, con objetos de la forma `persona`
 * 
 * Retorna: 
 * - una lista, array, conteniendo solamente las personas con más de 18 años
 */
function soloMayoresDeEdad(listaDePersonas) {
    let listaDeMayores = [];

    for (let i = 0; i < listaDePersonas.length; i++) {

        if (listaDePersonas[i].edad > 18) {
            listaDeMayores.push(listaDePersonas[i]);
        }
    }

    return listaDeMayores;
}

console.log("soloMayoresDeEdad()", soloMayoresDeEdad(listaPersonasEjemplo));


/**
 * 06 - laPersonaMayor
 * 
 * Recibe
 * - `listaDePersonas`: una lista, array, con objetos de la forma `persona`
 * 
 * Retorna: 
 * - una objeto con la persona de mayor edad en todo el listado.
 *   En caso de que hayan 2 personas con la misma edad,
 *   se puede retornar la primera que aparezca en el listado.
 */
function laPersonaMayor(listaDePersonas) {
    let personaMayor = listaDePersonas[0];

    for (let i = 1; i < listaDePersonas.length; i++) {

        if (listaDePersonas[i].edad > personaMayor.edad) {
            personaMayor = listaDePersonas[i];
        }
    }

    return personaMayor;
}

console.log("laPersonaMayor()", laPersonaMayor(listaPersonasEjemplo));


/**
 * 07 - agregarHeladoFavorito
 * 
 * Recibe
 * - `listaDePersonas`: una lista, array, con objetos de la forma `persona`.
 * - `listaDeHelados`: una lista, array, con strings para gustos de helado.
 * 
 * Retorna: 
 * - una nueva lista, donde a cada persona se le agrega un campo
 *   `heladoFavorito` tomado de la lista de listaDeHelados.
 *   Si no hay más helados disponibles, se asigna "vainilla" por defecto.
 */
function agregarHeladoFavorito(listaDePersonas, listaDeHelados) {
    let nuevaLista = [];

    for (let i = 0; i < listaDePersonas.length; i++) {

        let nuevoHelado = "vainilla";

        if (i < listaDeHelados.length) {
            nuevoHelado = listaDeHelados[i];
        }

        let nuevaPersona = {
            apellido: listaDePersonas[i].apellido,
            nombre: listaDePersonas[i].nombre,
            edad: listaDePersonas[i].edad,
            documento: listaDePersonas[i].documento,
            heladoFavorito: nuevoHelado
        };

        nuevaLista.push(nuevaPersona);
    }

    return nuevaLista;
}

console.log(
    "agregarHeladoFavorito()",
    agregarHeladoFavorito(
        listaPersonasEjemplo,
        ["chocolate", "limon", "frutilla"]
    )
);
