
//MODULO PARA CREAR UN ARCHIVO 

const fs = require('fs');

/*fs.appendFile('ArchivoCreado.txt', 'Informacion Academica,\n\nNombre: Kenia Leticia Marquez Guevara,\nCodigo: SMIS651819,\nCarrera: Ing.Sistemas y redes informaticas,\nFacultad: Ciencia y tecnologia,\nAño Academico: 2022', function(error){
    if(error){
        console.log('Error al crear archivo')
    }
})*/

//MODULO PARA LEER MI ARCHIVO CREADO ANTERIORMENTE


fs.readdir('./', (error, files) =>{
    if(error){
        throw error;
    }

    console.log(files);

    var archivo = fs.readFileSync('./ArchivoCreado.txt', 'utf-8');

    console.log('Contenido del Archivo」\n');
    console.log(archivo);
})

