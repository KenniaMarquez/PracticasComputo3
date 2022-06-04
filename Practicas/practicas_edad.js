const edad = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

edad.question("Ingrese su nombre: \n", name =>{


edad.question("Ingrese su edad: ", edad => {
    if (edad > 18){
        console.log(`${name}, Usted es mayor de edad`);
    }
    else{
    
        console.log(`${name}, Usted es menor de edad`);
    }
});

});

