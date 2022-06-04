const { Console } = require('console');

const operaciones = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
    
    operaciones.question('¿Cual es su nombre? \n' , (name) => {

    operaciones.question(` OK ${name}!  Ingrese el primer numero: \n`, (n1) => {
    
    operaciones.question('Ingrese el segundo numero; \n', (n2) => {

        operaciones.question
        ("❝ELIGE UNA OPCION❞ \n 1. suma \n 2. resta \n 3. división \n 4. multiplicacion \n 5. obtener los resultados de las 4 operaciones basicas \n \n \n",
        (opcion) => {

            if (opcion == 1 ) {
              let sumar = Number(n1) + Number(n2);
              console.log(` Estimad@ ${name}: La Suma de: ${n1} + ${n2}  es: = ${sumar}`);
              
            }

            if (opcion == 2) {
              let resta = Number(n1) - Number(n2);
              console.log(` Estimad@ ${name}: La Resta de: ${n1} - ${n2}  es: = ${resta}`);
              
            }

            if (opcion == 3) {
              let division = Number(n1) / Number(n2);
              console.log(` Estimad@ ${name}: La División de: ${n1} /  ${n2} es: =  ${(division).toFixed(2)}`);
              
            }

            if (opcion == 4) {
              let multiplicacion = Number(n1) * Number(n2);
              console.log(` Estimad@ ${name}: La Multiplicacion de: ${n1} * ${n2} es: = ${multiplicacion}`);
              
            }

            if (opcion == 5) {
                let sumar = Number(n1) + Number(n2);
                let resta = Number(n1) - Number(n2);
                let division = Number(n1) / Number(n2);
                let multiplicacion = Number(n1) * Number(n2);
                console.log(`${(name.toUpperCase())}: EL RESULTADO DE SUS OPERACIONES SON \n La Suma de: ${n1} + ${n2}  es: = ${sumar} \n La Resta de: ${n1} - ${n2}  es: = ${resta} \n La División de: ${n1} / ${n2} es: = ${(division).toFixed(2)} \n La Multiplicacion de: ${n1} * ${n2} es: = ${multiplicacion}`);
                
            }
        
          });
         
   })
})
});
